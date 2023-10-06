// Porbar dos valores
function suma(a, b) {
    return a + b;
}
function restar(a, b) {
    return a - b;
}

async function sumaAsync(a, b) {
    return Promise.resolve(suma(a, b));
}

let resultado = suma(10, 20);
let esperado = 30;


if(resultado !== esperado) {
    console.error("el resultado es: " + resultado + " y deberia ser: " + esperado);	
} else {
    console.log("La prueba paso correctamente");
}

resultado = restar(10, 20);
esperado = -10;
expected(esperado).tobe(resultado);
expected(esperado).toEqual(resultado);
test("Suma 10 + 20 = 30", async () => {
    const resultado = await sumaAsync(10, 20);
    const esperado = 30;
    expected(esperado).tobe(resultado);
});

if(resultado !== esperado) {
    console.error("el resultado es: " + resultado + " y deberia ser: " + esperado);	
} else {
    console.log("La prueba paso correctamente");
}

async function test(title, callback) {
    try {
        await callback();
        console.log(`El test: ${title} se ejecuto correctamente`);
    } catch (error) {
        console.error(`El test: ${title} fallo`);
        console.error(error);
    }
}

function expected( esperado ){
    return {
        tobe( resultado ){
            if(esperado !== resultado) {
                console.error("el resultado es: " + resultado + " y deberia ser: " + esperado);	
            } else {
                console.log("La prueba paso correctamente");
            }
        },
        toEqual( resultado ){
            if(esperado !== resultado) {
                console.error("el resultado es: " + resultado + " y deberia ser: " + esperado);	
            } else {
                console.log("La prueba paso correctamente");
            }
        }
    }
}