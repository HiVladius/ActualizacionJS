// Loop de eventos es el orden en que se ejecutan las funciones

console.log('primero');

setTimeout(() => {
    console.log('segundo');
}, 0);

console.log('tercero');

setTimeout(() => {
    console.log('cuarto');
}, 0);

new Promise(function (resolve) {
    resolve('desconocido...');
}).then(console.log);

console.log('ultimo');

function hi(){
    console.log('hi');
}

hi()