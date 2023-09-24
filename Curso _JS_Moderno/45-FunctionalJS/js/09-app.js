// Currying y parciales

const suma = (a, b, c) => a + b + c;

const parcial = a => b => c => suma(a, b, c);

const resultadosP = parcial(3)(4)(5);

console.log(resultadosP);

// Compare this snippet from Curso%20_JS_Moderno/45-FunctionalJS/js/06-app.js:
// // Funciones que retornan funciones

