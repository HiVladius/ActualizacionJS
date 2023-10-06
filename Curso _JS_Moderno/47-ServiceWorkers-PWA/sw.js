// Service Worker

const nombreArchivo = 'apv-v2' // para que se actualice el service worker tiene que cambiar el nombre del archivo

const archivos = [
  '/',
  '/index.html',
  '/error.html',
  '/css/bootstrap.css',
  '/css/styles.css',
  '/js/app.js',
  '/js/apv.js'
]

// Cuando se instala el service worker
// Se activa solo una vez
self.addEventListener('install', e => {
  console.log('Instalado el service worker')
  console.log(e)

  e.waitUntil(
    caches.open(nombreArchivo)
      .then(cache => {
        console.log('cacheando')
        cache.addAll(archivos)
      })
  )
})

// Activar el service worker
// Se activa cada vez que se cambia el service worker
self.addEventListener("activate", (e) => {
  console.log("Service Worker activado");
  e.waitUntil(
    caches.keys()
    .then(keys =>{
      // console.log(keys);
      return Promise.all(
        keys.filter(key => key !== nombreArchivo)
        .map(key => caches.delete(key))
      )
    })
  )
});

// Evento fetch para descargar archivos estaticos

self.addEventListener("fetch", (e) => {
  console.log("Fetch...", e);

  e.respondWith(
    caches.match(e.request)
    .then((respuestaCache) => {
      return respuestaCache || fetch(e.request);
    })
    .catch(() => caches.match("/error.html"))
  );
});
