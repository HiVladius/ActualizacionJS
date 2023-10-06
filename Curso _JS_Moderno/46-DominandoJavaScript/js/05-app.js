// Explicit Binding es cuando se usa el this para acceder a las propiedades de un objeto.
//

function persona(el1, el2) {
  console.log(`Mi nombre es ${this.nombre} y escucho ${el1} y ${el2}`);
}

const informacion = {
  nombre: "Vladimir",
};

const musicaFavorita = [
        "Heavy Metal",
        "Rock",
        "Blues"

    
];

persona.call(informacion, musicaFavorita[0,1], musicaFavorita[0,2]); // call recibe los argumentos de la función como una lista separada por comas.
persona.apply(informacion, musicaFavorita); // apply recibe los argumentos de la función como un arreglo.

const nuevaFn = persona.bind(informacion, musicaFavorita[0], musicaFavorita[1]); // bind crea una nueva función con los argumentos que se le pasen.
nuevaFn(); // Se ejecuta la nueva función creada por bind.
