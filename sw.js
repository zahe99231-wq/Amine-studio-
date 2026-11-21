const CACHE_NAME = 'anime-studio-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  // Never cache live Kaggle/Gradio API calls
  if (url.includes('/api/') || url.includes('gradio.live') || url.includes('trycloudflare.com') || url.includes('ngrok')) {
    return;
  }
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
