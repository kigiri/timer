const V = '06.04.2020'


addEventListener('sync', (e) => {
  e.waitUntil(fetch('/index.html').then(async (r) => r.ok && (await caches.open(V)).put('/index.html', r)))
})

addEventListener('install', e => e.waitUntil(caches.open(V)
  .then(cache => cache.addAll(urls))))

const handleFetch = async e => {
  if (e.request.url.includes('no-cache') || e.request.method !== 'GET') return fetch(e.request)
  const cache = await caches.open(V)
  const cacheRes = await caches.match('/index.html')
  if (cacheRes) return cacheRes
  const networkRes = await fetch(e.request)
  e.waitUntil(cache.put(e.request, networkRes.clone()))
  return networkRes
}

addEventListener('fetch', e => {
  const work = handleFetch(e)
  e.respondWith(work)
  e.waitUntil(work)
})
