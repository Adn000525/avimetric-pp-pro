const CACHE_NAME = 'avi-pp-pro-v1';
const assets = [
    './',
    './index.html',
    './manifest.json',
    './logo.png',
    './icon-512.png'
];

// Copiez ici les 3 blocs (install, activate, fetch) identiques au dossier PC ci-dessus
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});