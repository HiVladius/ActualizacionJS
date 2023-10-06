//new Binding es cuando se usa el this para acceder a las propiedades de un objeto.

function Automovil(modelo, color) {
    this.modelo = modelo;
    this.color = color;
}

function Accesorios(llantas, motor, puertas, ventanas){
    this.llantas = llantas;
    this.motor = motor;
    this.puertas = puertas;
    this.ventanas = ventanas;
}

const auto = new Automovil('Camaro', 'Negro');
console.log(auto);

window.color = 'negro'
function hi(){
    console.log(color);
}

const diseño = new Accesorios('fibra de carbon', '30hp', '4 puertas', 'cristal templado')
console.log(diseño);

window.puertas ="2 puertas"
function bye(){
    console.log(puertas);
}

bye()

hi()