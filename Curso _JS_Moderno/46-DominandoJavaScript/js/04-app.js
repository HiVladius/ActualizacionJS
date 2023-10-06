// Implicit Binding es cuando se usa el this para acceder a las propiedades de un objeto.


const usuario = {
    nombre: 'Vladimir',
    edad: 30,
    informacionUsuario() {
        console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`);
    },
    mascota: 'negrita',
    edadPerruna: 9,
    informacionMascota(){
        console.log(`La mascota de nombre ${this.mascota} tiene una edad perruna de ${this.edadPerruna}`);
    },
    doctorName: 'Dr. House',
    especialidad: 'Medicina Interna',
    informacionDoctor(){
        console.log(`El doctor ${this.doctorName} es especialista en ${this.especialidad}`);
    }

}

usuario.informacionUsuario();
usuario.informacionMascota();
usuario.informacionDoctor();