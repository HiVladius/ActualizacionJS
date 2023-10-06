// Progresive Web Aplication

if('serviceWorker'in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}else{
    console.warn('Service Worker no soportados en este navegador')
}