;
//asignar un nombre y versión al cache
const cacheName = 'v1_cache_sonrevivir';
const staticAssets = [
    './',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.3/umd/popper.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',

    './dist/css/style.min.css',
    './dist/js/main3813.js',
    './dist/fonts',
    './dist/images/cta-fig-1.jpg',
    './dist/images/hero-prop-10.jpg',
    './dist/images/hero-prop-3-thmb.jpg',
    './dist/images/newsletter-1-fig.jpg',
    './dist/images/posts-1.jpg',
    './dist/images/service-icon-1-1.svg',
    './dist/images/service-icon-1.svg',
    './dist/images/services-h-fig.jpg',
  ];

  self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
  });
  
  self.addEventListener('activate', e => {
    self.clients.claim();
  });
  
  self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);
  
    if (url.origin === location.origin) {
      e.respondWith(cacheFirst(req));
    } else {
      e.respondWith(networkAndCache(req));
    }
  });
  
  async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
  }
  
  async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
      const fresh = await fetch(req);
      await cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      const cached = await cache.match(req);
      return cached;
    }
  }