// Factory Pattern crea objetos basados en ciertas condiciones

class InputHTML {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }

    createInput() {
        return `<input type="${this.type}" name="${this.name}" id="${this.name}">`;
    }
}

class HTMLFactory {
    crearElemento(tipo, nombre) {
        switch (tipo) {
            case 'text':
                return new InputHTML('text', nombre);
            case 'tel':
                return new InputHTML('tel', nombre);
            case 'email':
                return new InputHTML('email', nombre);
            default:
                return;
        }
    }}

const elemento = new HTMLFactory();
const inputText = elemento.crearElemento('text', 'nombre-cliente');
console.log(inputText.createInput());

const inputTel = elemento.crearElemento('tel', 'telefono-cliente');
console.log(inputTel.createInput());

const inputEmail = elemento.crearElemento('email', 'email-cliente');
console.log(inputEmail.createInput());