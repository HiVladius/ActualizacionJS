// Module Pattern

const modulo1 = (function(){
    const nombre = 'Vlad'
    function hola(){
        console.log('Hola');
    }
    return {
        nombre,
        hola
    }

})()