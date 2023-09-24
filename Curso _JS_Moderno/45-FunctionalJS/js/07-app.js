// Funciones que retornan funciones

const obtenerClebte = () => () => console.log('Juan Pablo')

const fn = obtenerClebte()
fn()