//Scope: Scope de variables, sirve para saber donde se puede acceder a una variable y donde no

const cliente = 'vladimir' //Scope global

function mostrarCliente(){
    const cliente = 'Pedro'; //Scope local
    console.log(cliente);
}

mostrarCliente();