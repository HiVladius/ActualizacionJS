//Scrope

// const cliente = "vladimir" 

// function mostrarCliente() {
//     const cliente = "Juan"  // Scope 
//     console.log(cliente)
// }
// console.log(cliente);
// mostrarCliente()


// los closures son funciones que recuerdan el scope de donde fueron creadas
// y pueden acceder a las variables de ese scope

const obteenrCliente = () => {
    const nombre = "vladimir"
    function muestraNombre() {
        console.log(nombre)
    }
    return muestraNombre;
}

const cliente = obteenrCliente()

cliente()