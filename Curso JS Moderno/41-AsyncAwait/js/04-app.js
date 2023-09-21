function descargarNuevosClientes(){
    return new Promise(resolve =>{
        console.log('Descargando clientes... espere...');

        setTimeout(() => {
            resolve('Los clientes fueron descargados');
        }, 5000);
    })
}


function desacargarUltimosPedidos(){
    return new Promise(resolve =>{
        console.log('Descargando pedidos... espere...');

        setTimeout(() => {
            resolve('Los pedidos fueron descargados');
        }, 3000);
    })
}

const app = async () => {
    try{
        // const clientes = await descargarNuevosClientes();
        // console.log(clientes);

        // const pedidos = await desacargarUltimosPedidos();
        // console.log(pedidos);

        const respuesta = await Promise.all([descargarNuevosClientes(), desacargarUltimosPedidos()]);
        console.log(respuesta[0]);
        console.log(respuesta[1]);
        

    }catch (error){
        console.log(error);
    }
}

app();