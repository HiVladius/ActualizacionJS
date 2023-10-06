// Constructor Pattern (patron de creacion)

class Persona {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente extends Persona{
    constructor(nombre, email, empresa) {
        super(nombre, email);
        this.empresa = empresa;
    }
}

// instancias
const persona = new Persona('Juan', 'cooreo@cliente.com');
const cliente = new Cliente('Juan', 'clientes@clientes.com', 'Udemy');
console.log(cliente);
console.log(persona);