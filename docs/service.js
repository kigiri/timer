const v = '01.04.2020'

const urls = [
  '/index.html',
  '/__/firebase/7.13.1/firebase-app.js',
  '/__/firebase/7.13.1/firebase-auth.js',
  '/__/firebase/7.13.1/firebase-database.js',
  '/__/firebase/init.js',
]

addEventListener('sync', (e) => {
  e.waitUntil(fetch(urls[0]).then(async (r) => r.ok && (await caches.open(v)).put(urls[0], r)))
})

addEventListener('install', e => e.waitUntil(caches.open(v)
  .then(cache => cache.addAll(urls))))

const handleFetch = async e => {
  if (e.request.url.includes('no-cache') || e.request.method !== 'GET') return fetch(e.request)
  const cache = await caches.open(v)
  const url = urls.includes(e.request.url) ? e.request.url : urls[0]
  const cacheRes = await caches.match(e.request.url)
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
