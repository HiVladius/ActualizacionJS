//Cohercion es cuando JavaScript cambia el tipo de dato de una variable para poder realizar una operación.

const numero1 = 20;
const numero2 = "20";

console.log(numero1 + numero2); // 2020 cohersion implicita
console.log(numero1 + parseInt(numero2)); // 40 cohersion explicita
console.log(Number(numero2) + numero1); // 20 cohersion explicita

