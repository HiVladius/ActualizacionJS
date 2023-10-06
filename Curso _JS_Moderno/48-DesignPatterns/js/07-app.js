//Name spaces es una forma de evitar colisiones de nombres en el codigo

const restauranApp = {}; // Namespace o Object literal

restauranApp.platillos= [
    {
        platillo: 'Pizza',
        precio: 25
    },
    {
        platillo: 'Hamburguesa',
        precio: 20
    },
    {
        platillo: 'Hot Dog',
        precio: 15
    }
]

restauranApp.funciones = {
    mostrarMenu: ()=>{
        console.log('Bienvenido a nuestro menu');
        platillos.forEach((platillo, index)=>{
            console.log(`${index}: ${platillo.platillo} $${platillo.precio}`);
        });

      
    },
    ordenar: id =>{
        console.log(`Tus platillos: ${platillos[id].platillo} se estan preparando`);
    },
    agregarPlatillo: (platillo, precio) =>{
        const nuevo = {
            platillo,
            precio
        };
        restauranApp.platillos.push(nuevo);
    }
}

const {platillos} = restauranApp;

restauranApp.funciones.mostrarMenu(platillos);

restauranApp.funciones.ordenar(1);

restauranApp.funciones.agregarPlatillo('Pastel', 25);