//Hoisting en JavaScript es cuando las variables y funciones se procesan antes de que se ejecute cualquier pieza de código.
obtenerCliente('Vladimir');

function obtenerCliente(nombre){
    console.log(`El nombre del cliente es ${nombre}`);
}

const obtenerCliente2 = function(nombre){
    console.log(`El nombre del cliente es ${nombre}`);
}
obtenerCliente2('Alexis');