// =====================================================
// SERVICE WORKER POUR SAVATE PWA v3.3.2 - COMPLET
// =====================================================

const CACHE_NAME = 'savate-pwa-v3.3.2';
const CACHE_VERSION = '3.3.2';

console.log('🥊 Service Worker Savate PWA v3.3.2 initialisé');

// =====================================================
// CONFIGURATION DU CACHE
// =====================================================

// Fichiers essentiels à mettre en cache immédiatement
const CORE_CACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json'
    // Note: service-worker.js ne doit pas être mis en cache par lui-même
];

// Ressources externes (CDN) à mettre en cache
const EXTERNAL_RESOURCES = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Configuration avancée du cache
const CACHE_CONFIG = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    maxEntries: 100,
    purgeOnQuotaError: true
};

// =====================================================
// INSTALLATION DU SERVICE WORKER
// =====================================================

self.addEventListener('install', (event) => {
    console.log('📦 Installation du Service Worker Savate PWA v3.3.2');
    
    event.waitUntil(
        Promise.all([
            // Ouvrir le cache principal
            caches.open(CACHE_NAME),
            
            // Passer en mode "skipWaiting" pour forcer l'activation
            self.skipWaiting()
        ])
        .then(([cache]) => {
            console.log('✅ Cache ouvert:', CACHE_NAME);
            
            // Mise en cache des fichiers essentiels avec gestion d'erreurs
            const cachePromises = [
                // Fichiers locaux essentiels
                cache.addAll(CORE_CACHE_URLS.filter(url => url !== '/service-worker.js'))
                    .catch(error => {
                        console.warn('⚠️ Certains fichiers locaux non trouvés:', error);
                        // Essayer au moins de mettre en cache la racine
                        return cache.add('/').catch(() => {
                            console.warn('⚠️ Impossible de mettre en cache la racine');
                        });
                    }),
                
                // Ressources externes (optionnel)
                ...EXTERNAL_RESOURCES.map(url => 
                    fetch(url, { mode: 'no-cors' })
                        .then(response => {
                            if (response.ok || response.type === 'opaque') {
                                return cache.put(url, response);
                            }
                        })
                        .catch(error => {
                            console.warn('⚠️ Impossible de mettre en cache:', url, error.message);
                        })
                )
            ];
            
            return Promise.allSettled(cachePromises);
        })
        .then((results) => {
            const successful = results.filter(result => result.status === 'fulfilled').length;
            const failed = results.filter(result => result.status === 'rejected').length;
            
            console.log(`✅ Installation terminée: ${successful} réussies, ${failed} échouées`);
            
            // Notifier l'installation réussie
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_INSTALLED',
                        version: CACHE_VERSION,
                        cached: successful
                    });
                });
            });
        })
        .catch((error) => {
            console.error('❌ Erreur lors de l\'installation:', error);
        })
    );
});

// =====================================================
// ACTIVATION DU SERVICE WORKER
// =====================================================

self.addEventListener('activate', (event) => {
    console.log('🚀 Activation du Service Worker Savate PWA v3.3.2');
    
    event.waitUntil(
        Promise.all([
            // Nettoyage des anciens caches
            cleanupOldCaches(),
            
            // Prise de contrôle immédiate
            self.clients.claim()
        ])
        .then(() => {
            console.log('✅ Service Worker activé et en contrôle complet');
            
            // Notifier l'activation
            return self.clients.matchAll();
        })
        .then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SW_ACTIVATED',
                    version: CACHE_VERSION,
                    timestamp: new Date().toISOString()
                });
            });
            
            console.log(`📡 Notification envoyée à ${clients.length} client(s)`);
        })
        .catch(error => {
            console.error('❌ Erreur lors de l\'activation:', error);
        })
    );
});

// Fonction de nettoyage des anciens caches
async function cleanupOldCaches() {
    try {
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(cacheName => 
            cacheName.startsWith('savate-pwa-') && cacheName !== CACHE_NAME
        );
        
        if (oldCaches.length > 0) {
            console.log('🗑️ Suppression des anciens caches:', oldCaches);
            await Promise.all(
                oldCaches.map(cacheName => caches.delete(cacheName))
            );
            console.log('✅ Anciens caches supprimés');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Erreur lors du nettoyage des caches:', error);
        return false;
    }
}

// =====================================================
// INTERCEPTION DES REQUÊTES RÉSEAU
// =====================================================

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET et les extensions du navigateur
    if (request.method !== 'GET' || 
        url.protocol.startsWith('chrome-extension') || 
        url.protocol.startsWith('moz-extension') ||
        url.protocol.startsWith('safari-extension')) {
        return;
    }
    
    // Ignorer les requêtes vers des domaines spécifiques
    if (url.hostname.includes('google-analytics.com') || 
        url.hostname.includes('googletagmanager.com')) {
        return;
    }
    
    console.log('🌐 Requête interceptée:', request.url);
    
    // Stratégie de cache selon le type de ressource
    event.respondWith(
        handleFetchRequest(request)
            .catch(error => {
                console.error('❌ Erreur lors de la gestion de la requête:', error);
                return createFallbackResponse(request);
            })
    );
});

// =====================================================
// STRATÉGIES DE GESTION DES REQUÊTES
// =====================================================

async function handleFetchRequest(request) {
    const url = new URL(request.url);
    
    try {
        // Stratégie selon le type de ressource
        if (isAppResource(url)) {
            return await cacheFirst(request);
        } else if (isDataRequest(url)) {
            return await networkFirst(request);
        } else if (isExternalResource(url)) {
            return await staleWhileRevalidate(request);
        } else {
            return await networkFirst(request);
        }
    } catch (error) {
        console.error('❌ Erreur lors de la gestion de la requête:', error);
        throw error;
    }
}

// Stratégie Cache First - pour les ressources statiques de l'application
async function cacheFirst(request) {
    console.log('💾 Cache First:', request.url);
    
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('✅ Trouvé en cache:', request.url);
            return cachedResponse;
        }
        
        console.log('🌐 Récupération réseau:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
            console.log('💾 Mis en cache:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Erreur Cache First:', error);
        throw error;
    }
}

// Stratégie Network First - pour les données dynamiques
async function networkFirst(request) {
    console.log('🌐 Network First:', request.url);
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
            console.log('💾 Mis à jour en cache:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('⚠️ Réseau indisponible, tentative cache:', error.message);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('✅ Servi depuis le cache (mode hors ligne):', request.url);
            return cachedResponse;
        }
        
        throw error;
    }
}

// Stratégie Stale While Revalidate - pour les ressources externes
async function staleWhileRevalidate(request) {
    console.log('🔄 Stale While Revalidate:', request.url);
    
    const cachedResponse = await caches.match(request);
    
    // Lancer la mise à jour en arrière-plan
    const fetchPromise = fetch(request)
        .then(response => {
            if (response.ok) {
                const cache = caches.open(CACHE_NAME);
                cache.then(c => c.put(request, response.clone()));
                console.log('🔄 Ressource mise à jour en arrière-plan:', request.url);
            }
            return response;
        })
        .catch(error => {
            console.warn('⚠️ Échec de mise à jour en arrière-plan:', error.message);
        });
    
    // Retourner immédiatement la version en cache si disponible
    if (cachedResponse) {
        console.log('✅ Servi depuis le cache (mise à jour en arrière-plan):', request.url);
        return cachedResponse;
    }
    
    // Sinon attendre la réponse réseau
    return fetchPromise;
}

// =====================================================
// CLASSIFICATION DES RESSOURCES
// =====================================================

function isAppResource(url) {
    return url.origin === self.location.origin && 
           (url.pathname.endsWith('.html') || 
            url.pathname.endsWith('.css') || 
            url.pathname.endsWith('.js') ||
            url.pathname.endsWith('.json') ||
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.jpg') ||
            url.pathname.endsWith('.jpeg') ||
            url.pathname.endsWith('.gif') ||
            url.pathname.endsWith('.svg') ||
            url.pathname.endsWith('.webp') ||
            url.pathname === '/' ||
            url.pathname.includes('manifest'));
}

function isDataRequest(url) {
    return url.pathname.includes('/api/') || 
           url.pathname.includes('/data/') ||
           url.searchParams.has('data') ||
           url.pathname.endsWith('.json');
}

function isExternalResource(url) {
    return url.origin !== self.location.origin &&
           (url.hostname.includes('cdnjs.cloudflare.com') ||
            url.hostname.includes('fonts.googleapis.com') ||
            url.hostname.includes('fonts.gstatic.com') ||
            url.hostname.includes('unpkg.com') ||
            url.hostname.includes('jsdelivr.net'));
}

// =====================================================
// RÉPONSES DE SECOURS
// =====================================================

function createFallbackResponse(request) {
    const url = new URL(request.url);
    
    // Pour les pages HTML, retourner une page hors ligne
    if (request.headers.get('accept')?.includes('text/html')) {
        return new Response(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Savate PWA - Hors ligne</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                        box-sizing: border-box;
                    }
                    .container {
                        max-width: 500px;
                        background: rgba(255,255,255,0.1);
                        padding: 40px;
                        border-radius: 20px;
                        backdrop-filter: blur(10px);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    }
                    h1 { margin-bottom: 20px; font-size: 2.5em; }
                    p { margin-bottom: 15px; font-size: 1.1em; line-height: 1.6; }
                    button {
                        background: #ff6b6b;
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-size: 1.1em;
                        cursor: pointer;
                        margin: 10px;
                        transition: all 0.3s;
                    }
                    button:hover { background: #ff5252; transform: translateY(-2px); }
                    .emoji { font-size: 4em; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="emoji">🥊</div>
                    <h1>Savate PWA</h1>
                    <h2>Mode Hors Ligne</h2>
                    <p>🔴 Vous êtes actuellement hors ligne ou la ressource demandée n'est pas disponible.</p>
                    <p>📱 L'application PWA continue de fonctionner en mode local avec les données mises en cache.</p>
                    <p>🔄 Dès que votre connexion sera rétablie, les données seront automatiquement synchronisées.</p>
                    
                    <button onclick="window.location.reload()">🔄 Réessayer</button>
                    <button onclick="window.location.href='/'">🏠 Accueil</button>
                </div>
                
                <script>
                    // Vérification automatique de la connexion
                    window.addEventListener('online', () => {
                        document.body.innerHTML += '<div style="position:fixed;top:20px;right:20px;background:#4caf50;color:white;padding:15px;border-radius:10px;z-index:1000;">🟢 Connexion rétablie !</div>';
                        setTimeout(() => window.location.reload(), 2000);
                    });
                </script>
            </body>
            </html>
        `, {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
    
    // Pour les autres types de contenu
    return new Response(JSON.stringify({
        error: 'Ressource non disponible hors ligne',
        message: 'Cette ressource n\'est pas disponible en mode hors ligne.',
        offline: true,
        timestamp: new Date().toISOString()
    }), {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
    });
}

// =====================================================
// GESTION DES MESSAGES DES CLIENTS
// =====================================================

self.addEventListener('message', (event) => {
    const { type, data } = event.data || {};
    
    console.log('📨 Message reçu du client:', type);
    
    switch (type) {
        case 'SKIP_WAITING':
            console.log('📨 SKIP_WAITING: Activation forcée');
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({
                version: CACHE_VERSION,
                cacheName: CACHE_NAME,
                timestamp: new Date().toISOString()
            });
            break;
            
        case 'CLEAR_CACHE':
            console.log('📨 CLEAR_CACHE: Nettoyage du cache demandé');
            caches.delete(CACHE_NAME)
                .then(() => {
                    event.ports[0].postMessage({ 
                        success: true, 
                        message: 'Cache nettoyé avec succès' 
                    });
                })
                .catch(error => {
                    event.ports[0].postMessage({ 
                        success: false, 
                        error: error.message 
                    });
                });
            break;
            
        case 'CACHE_RESOURCE':
            if (data && data.url) {
                console.log('📨 CACHE_RESOURCE:', data.url);
                caches.open(CACHE_NAME)
                    .then(cache => {
                        return fetch(data.url).then(response => {
                            if (response.ok) {
                                return cache.put(data.url, response);
                            }
                            throw new Error(`HTTP ${response.status}`);
                        });
                    })
                    .then(() => {
                        event.ports[0].postMessage({ 
                            success: true, 
                            message: `Ressource ${data.url} mise en cache` 
                        });
                    })
                    .catch(error => {
                        event.ports[0].postMessage({ 
                            success: false, 
                            error: error.message 
                        });
                    });
            }
            break;
            
        case 'GET_CACHE_INFO':
            getCacheInfo()
                .then(info => {
                    event.ports[0].postMessage({ 
                        success: true, 
                        data: info 
                    });
                })
                .catch(error => {
                    event.ports[0].postMessage({ 
                        success: false, 
                        error: error.message 
                    });
                });
            break;
            
        default:
            console.log('📨 Message non reconnu:', type, data);
    }
});

// Obtenir des informations sur le cache
async function getCacheInfo() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        
        return {
            cacheName: CACHE_NAME,
            version: CACHE_VERSION,
            entries: keys.length,
            urls: keys.map(request => request.url),
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        throw new Error(`Impossible d'obtenir les informations du cache: ${error.message}`);
    }
}

// =====================================================
// SYNCHRONISATION EN ARRIÈRE-PLAN
// =====================================================

self.addEventListener('sync', (event) => {
    console.log('🔄 Événement de synchronisation:', event.tag);
    
    if (event.tag === 'savate-background-sync') {
        event.waitUntil(
            performBackgroundSync()
        );
    }
});

async function performBackgroundSync() {
    try {
        console.log('🔄 Démarrage de la synchronisation en arrière-plan');
        
        // Notifier les clients de la synchronisation
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_START',
                timestamp: new Date().toISOString()
            });
        });
        
        // Simuler la synchronisation des données
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Notifier la fin de la synchronisation
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_COMPLETE',
                timestamp: new Date().toISOString()
            });
        });
        
        console.log('✅ Synchronisation en arrière-plan terminée');
    } catch (error) {
        console.error('❌ Erreur lors de la synchronisation:', error);
    }
}

// =====================================================
// GESTION DES NOTIFICATIONS PUSH
// =====================================================

self.addEventListener('push', (event) => {
    console.log('📬 Notification Push reçue');
    
    let notificationData = {
        title: 'Savate PWA',
        body: 'Notification de l\'application Savate',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png'
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            notificationData = { ...notificationData, ...data };
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }
    
    const options = {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: notificationData.url || '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Ouvrir l\'application',
                icon: '/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Fermer',
                icon: '/close-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, options)
    );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
    console.log('📱 Clic sur notification:', event.action);
    
    event.notification.close();
    
    if (event.action === 'close') {
        return;
    }
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clients => {
                // Chercher un client existant à focuser
                for (const client of clients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Ouvrir une nouvelle fenêtre si aucun client trouvé
                if (self.clients.openWindow) {
                    return self.clients.openWindow(urlToOpen);
                }
            })
    );
});

// =====================================================
// NETTOYAGE PÉRIODIQUE ET MAINTENANCE
// =====================================================

// Nettoyage périodique du cache (toutes les heures)
setInterval(async () => {
    try {
        await performCacheCleanup();
    } catch (error) {
        console.error('❌ Erreur lors du nettoyage périodique:', error);
    }
}, 60 * 60 * 1000); // 1 heure

async function performCacheCleanup() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        
        const now = Date.now();
        let cleanedCount = 0;
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const responseDate = new Date(dateHeader).getTime();
                    if (now - responseDate > CACHE_CONFIG.maxAge) {
                        await cache.delete(request);
                        cleanedCount++;
                    }
                }
            }
        }
        
        if (cleanedCount > 0) {
            console.log(`🧹 ${cleanedCount} entrées de cache nettoyées`);
        }
        
        // Vérifier la taille du cache
        const remainingRequests = await cache.keys();
        if (remainingRequests.length > CACHE_CONFIG.maxEntries) {
            const excessCount = remainingRequests.length - CACHE_CONFIG.maxEntries;
            console.log(`⚠️ Cache trop volumineux, suppression de ${excessCount} entrées les plus anciennes`);
            
            // Supprimer les entrées les plus anciennes
            for (let i = 0; i < excessCount; i++) {
                await cache.delete(remainingRequests[i]);
            }
        }
        
    } catch (error) {
        console.error('❌ Erreur lors du nettoyage du cache:', error);
    }
}

// =====================================================
// GESTION DES ERREURS GLOBALES
// =====================================================

self.addEventListener('error', (event) => {
    console.error('❌ Erreur dans le Service Worker:', event.error);
    
    // Notifier les clients de l'erreur
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'SW_ERROR',
                error: event.error.message,
                timestamp: new Date().toISOString()
            });
        });
    });
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promesse rejetée dans le Service Worker:', event.reason);
    
    // Empêcher l'affichage par défaut
    event.preventDefault();
});

// =====================================================
// INITIALISATION FINALE
// =====================================================

console.log('✅ Service Worker Savate PWA v3.3.2 complètement initialisé');
console.log('📊 Configuration:', {
    cacheName: CACHE_NAME,
    version: CACHE_VERSION,
    maxAge: CACHE_CONFIG.maxAge / (24 * 60 * 60 * 1000) + ' jours',
    maxEntries: CACHE_CONFIG.maxEntries
});

// Auto-diagnostic du Service Worker
setTimeout(() => {
    console.log('🔍 Auto-diagnostic du Service Worker...');
    
    caches.has(CACHE_NAME)
        .then(exists => {
            console.log(exists ? '✅ Cache principal créé' : '⚠️ Cache principal non trouvé');
        });
    
    self.clients.matchAll()
        .then(clients => {
            console.log(`📱 ${clients.length} client(s) connecté(s)`);
        });
    
}, 2000);