// singleton no se puede crear mas de una instancia de un objeto

// Singleton Pattern (patron de creacion)
let instancia = null;

class Persona {
    constructor(nombre, email) {
        if (!instancia) {
            this.nombre = nombre;
            this.email = email;
            instancia = this;
        } else {
            return instancia;
        }
        
    }
}
// instancias
const persona = new Persona('Vladimir', 'correo@vlasdcorp.com');
const persona2 = new Persona('iris', 'iric@correo.com')
console.log(persona2);

console.log(persona);