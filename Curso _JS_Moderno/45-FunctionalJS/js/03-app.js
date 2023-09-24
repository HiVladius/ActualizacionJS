// higher order functions
const input = document.querySelector("input");

const carrito = [
  { nombre: "Monitor 27 pulgadas", precio: 500 },
  { nombre: "Televisión", precio: 100 },
  { nombre: "Tablet", precio: 200 },
  { nombre: "Audifonos", precio: 300 },
  { nombre: "Teclado", precio: 400 },
  { nombre: "Celular", precio: 700 },
];

const resultado = carrito.filter((producto) => producto.precio > 400); // devuelve un nuevo array
const nombreProducto = carrito.filter((producto) =>
  producto.nombre.startsWith("T")
);

// console.log(resultado);
// console.log(nombreProducto);

// filter returns a new array
const mayor400 = (producto) => {
  // filter needs a function
  return producto.precio > 400;
};

const nombre = (producto) => {
  return producto.nombre.startsWith("T");
};

const resultado2 = carrito.filter(mayor400); // filter needs a function
const nombre2 = carrito.filter(nombre);

console.log(resultado2);
console.log(nombre2);

input.addEventListener("input", (e) => {
  const busqueda = e.target.value.toLowerCase();
  const carritoFiltrado = carrito.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda)
  );
  console.log(carritoFiltrado);
});
