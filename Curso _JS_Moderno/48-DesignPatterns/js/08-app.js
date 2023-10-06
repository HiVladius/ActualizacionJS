// Ejemplo de Mediator
// Se utiliza para comunicar objetos entre si sin que esten acoplados

function Vendedor (nombre){
    this.nombre = nombre;
    this.sala = null;
}

Vendedor.prototype = {
    oferta: (articulo, precio) => {
        console.log(`Tenemos el siguiente articulo ${articulo}, iniciamos en ${precio}`);
    },
    vendido: comprador => {
        console.log(`Vendido a ${comprador}`);
    }
}

function Comprador (nombre){
    this.nombre = nombre;
    this.sala = null;
}
Comprador.prototype = {
    oferta: (cantidad, comprador) => {
        console.log(`${comprador.nombre} : ${cantidad}`);
    }
}


function Subasta(){
    let compradorrs ={};
    return{
        registrar: usuario => {
            compradorrs[usuario.nombre] = usuario;
            usuario.sala = this;
        }
    }
}

// Crear objetos

const vlad = new Comprador('Vlad');
const alex = new Comprador('Alex');
const vendedor = new Vendedor('Vendedor de Autos');
const subasta = new Subasta();

//Tienes que registrarlos
subasta.registrar(vlad);
subasta.registrar(alex);
subasta.registrar(vendedor);

vendedor.oferta('Mustang 1966', 300);

vlad.oferta(350, vlad);
alex.oferta(450, alex);
vlad.oferta(500, vlad);
alex.oferta(550, alex);

vendedor.vendido('Vlad');
