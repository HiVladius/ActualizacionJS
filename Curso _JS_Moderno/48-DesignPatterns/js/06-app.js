//Mixin pattern - Agregar funciones a un objeto - Sirven para reutilizar codigo

class Persona {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

const funcionesPersona = {
    mostrarInformacion() {
        console.log(`Nombre: ${this.nombre} Email: ${this.email}`);
    },
    mostrarNombre() {
        console.log(`Mi nombre es ${this.nombre}`);
    }
}

// Añadir funciones a la clase de Persona
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const cliente = new Persona('Vlad', 'correo@correo.com');
const persona = new Persona('Iris', 'correo@iris.com');


console.log(cliente);
console.log(persona);

cliente.mostrarInformacion();
cliente.mostrarNombre();

persona.mostrarNombre();
persona.mostrarInformacion();