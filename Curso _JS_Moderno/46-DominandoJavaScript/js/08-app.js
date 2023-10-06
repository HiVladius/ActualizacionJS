// Self es un objeto que hace referencia al objeto global

self.onload = function () {
    console.log('primero');
}

window.nombre = 'Monitor 20 Pulgadas';

const productos ={
    precio: 30,
    disponibilidad: true,
    mostrarInventario: () => {
        return `El ${self.nombre} `
    }
}

console.log(productos.mostrarInventario());