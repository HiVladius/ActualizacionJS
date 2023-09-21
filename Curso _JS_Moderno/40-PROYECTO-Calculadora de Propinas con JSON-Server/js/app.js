let cliente = {
  nombre: "",
  hora: "",
  pedidos: [],
};

const categorias = {
  1: "Comida",
  2: "Bebida",
  3: "Postre",
  4: "Frito",
};

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente(e) {
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;

  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    // verificar si hay una alerta previa
    const alertaPrevia = document.querySelector(".invalid-feedback");

    if (!alertaPrevia) {
      const alerta = document.createElement("div");
      alerta.classList.add("invalid-feedback", "d-block", "text-center");
      alerta.textContent = "Todos los campos son obligatorios";
      document.querySelector(".modal-body form").appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }
    return;
  }
  cliente = { ...cliente, mesa, hora };

  //ocultar modal
  const modalFormulario = document.querySelector("#formulario");
  const modalBoostrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBoostrap.hide();

  //mostrar las secciones

  mostrarSecciones();

  //Obtener platillos de la api
  obtenerPlatillos();
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll(".d-none");
  seccionesOcultas.forEach((seccion) => {
    seccion.classList.remove("d-none");
  });
}

function obtenerPlatillos() {
  const url = "http://localhost:3000/platillos";
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => mostrarPlatillos(resultado))
    .catch((error) => console.log(error));
}

function mostrarPlatillos(platillos) {
  const contenido = document.querySelector("#platillos .contenido");
  platillos.forEach((platillo) => {
    const row = document.createElement("div");
    row.classList.add("row", "py-3", "align-items-center", "border-bottom");

    const nombre = document.createElement("div");
    nombre.classList.add("col-4", "col-md-3", "fw-bold");
    nombre.textContent = platillo.nombre;

    const precio = document.createElement("div");
    precio.classList.add("col-4", "col-md-3", "fw-bold");
    precio.textContent = `$${platillo.precio}`;

    const categoria = document.createElement("div");
    categoria.classList.add("col-4", "col-md-3", "fw-bold");
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add("form-control");

    // Funcion que detecta la cantidad de productos
    inputCantidad.onchange = function () {
      const cantidad = parseInt(this.value);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregar = document.createElement("div");
    agregar.classList.add("col-md-1");
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);

    contenido.appendChild(row);
  });
}

function agregarPlatillo(producto) {
  // Extraer el arreglo de pedidos
  // Revisar que la cantidad sea mayor a 0
  let { pedidos } = cliente;

  if (producto.cantidad > 0) {
    //Comprueba si el producto ya existe en el arreglo de pedidos
    if (pedidos.some((articulo) => articulo.id === producto.id)) {
      // El articulo ya existe, actualizar la cantidad
      const pedidoActualizado = pedidos.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      // Asignar el nuevo arreglo de pedidos
      cliente.pedidos = [...pedidoActualizado];
    } else {
      cliente.pedidos = [...pedidos, producto];
    }
  } else {
    //Eliminar del arreglo de pedidos
    const resultado = pedidos.filter((articulo) => articulo.id !== producto.id);
    cliente.pedidos = [...resultado];
  }
  // Limpiar el HTML previo
  limpiarHTML();

  if(cliente.pedidos.length){
    // mostrar el resumen
  actualizarResumen();
  }else{
    mensajePedidoVacio();
  }
  
}

function actualizarResumen() {
  const contenido = document.querySelector("#resumen .contenido");

  const resumen = document.createElement("div");
  resumen.classList.add("col-md-6", "card", "py-5", "px-3", "shadow");

  const mesa = document.createElement("p");
  mesa.textContent = "Mesa: ";
  mesa.classList.add("fw-bold");

  const mesaSpan = document.createElement("span");
  mesaSpan.textContent = cliente.mesa;
  mesaSpan.classList.add("fw-normal");

  const hora = document.createElement("p");
  hora.textContent = "Hora: ";
  hora.classList.add("fw-bold");

  const horaSpan = document.createElement("span");
  horaSpan.textContent = cliente.hora;
  horaSpan.classList.add("fw-normal");

  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  // Titulo de la seccion
  const heading = document.createElement("h3");
  heading.textContent = "Resumen de Pedido";
  heading.classList.add("my-4", "text-center");

  // Iterar sobre el arreglo de pedidos

  const grupo = document.createElement("ul");
  grupo.classList.add("list-group", "list-group-flush", "text-center");

  const { pedidos } = cliente;
  pedidos.forEach((pedido) => {
    const { nombre, cantidad, precio, id } = pedido;

    const lista = document.createElement("li");
    lista.classList.add("list-group-item");

    const nombreEl = document.createElement("h4");
    nombreEl.classList.add("my-4");
    nombreEl.textContent = nombre;

    // Cantidad del articulo

    const cantidadEl = document.createElement("p");
    cantidadEl.classList.add("fw-bold");
    cantidadEl.textContent = "Cantidad: ";

    const cantidadValor = document.createElement("span");
    cantidadValor.classList.add("fw-normal");
    cantidadValor.textContent = cantidad;

    // Precio del articulo
    const precioEl = document.createElement("p");
    precioEl.classList.add("fw-bold");
    precioEl.textContent = "Precio: ";

    const precioValor = document.createElement("span");
    precioValor.classList.add("fw-normal");
    precioValor.textContent = `$${precio}`;

    // Subtotal del articulo

    const subtotalEl = document.createElement("p");
    subtotalEl.classList.add("fw-bold");
    subtotalEl.textContent = "Subtotal: ";

    const subtotalValor = document.createElement("span");
    subtotalValor.classList.add("fw-normal");
    subtotalValor.textContent = calcularSubtotal(precio, cantidad);

    // Boton para eliminar el articulo
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "mx-2");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    //Agregar valores a sus contenedores
    cantidadEl.appendChild(cantidadValor);
    precioEl.appendChild(precioValor);
    subtotalEl.appendChild(subtotalValor);

    // Agregar elementos al li
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(precioEl);
    lista.appendChild(subtotalEl);
    lista.appendChild(btnEliminar);

    // agregar al grupo
    grupo.appendChild(lista);
  });

  // Agregar el resumen al contenido
  resumen.appendChild(heading);
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(grupo);

  contenido.appendChild(resumen);

  // Mostrar formulario de propinas
mostrarPropinas();

}

function limpiarHTML() {
  const contenido = document.querySelector("#resumen .contenido");
  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

function calcularSubtotal(precio, cantidad) {
  return `$${precio * cantidad}`;
}

function eliminarProducto(id) {
  const { pedidos } = cliente;
  const resultado = pedidos.filter(articulo => articulo.id !== id);
  cliente.pedidos = [...resultado];

  limpiarHTML();

  if(cliente.pedidos.length){
    // mostrar el resumen
  actualizarResumen();
  }else{
    mensajePedidoVacio();
  }

  // El producto se elimino del arreglo de pedidos
  const productoEliminado = `#producto-${id}`;
  const inputEliminado = document.querySelector(productoEliminado);
  inputEliminado.value = 0;
  

}

function mensajePedidoVacio(){
  const contenido = document.querySelector("#resumen .contenido");
  const texto = document.createElement("p");
  texto.classList.add("text-center", "fw-bold", "my-5");
  texto.textContent = "Aún no hay pedidos";

  contenido.appendChild(texto);
}

function mostrarPropinas() {
  const contenido = document.querySelector("#resumen .contenido");
  const formulario = document.createElement("div");
  formulario.classList.add("col-md-6", "formulario", );

  const divFormulario = document.createElement("div");
  divFormulario.classList.add("card", "py-5", "px-3", "shadow");


  const heading = document.createElement("h3");
  heading.classList.add("my-4", "text-center");
  heading.textContent = "Propina"

  // Radio buttons
  const radio10 = document.createElement("input");
  radio10.type = "radio";
  radio10.name = "propina";
  radio10.value = "10";
  radio10.classList.add("form-check-input");
  radio10.onclick = calcularPropina;

  const rario10Label = document.createElement("label");
  rario10Label.textContent = "10%";
  rario10Label.classList.add("form-check-label");

  const radio10Div = document.createElement("div");
  radio10Div.classList.add("form-check", "my-3");

  // 25%

  const radio25 = document.createElement("input");
  radio25.type = "radio";
  radio25.name = "propina";
  radio25.value = "25";
  radio25.classList.add("form-check-input");
  radio25.onclick = calcularPropina;

  const rario25Label = document.createElement("label");
  rario25Label.textContent = "25%";
  rario25Label.classList.add("form-check-label");

  const radio25Div = document.createElement("div");
  radio25Div.classList.add("form-check", "my-3");


  // 50%

  const radio50 = document.createElement("input");
  radio50.type = "radio";
  radio50.name = "propina";
  radio50.value = "50";
  radio50.classList.add("form-check-input");
  radio50.onclick = calcularPropina;

  const rario50Label = document.createElement("label");
  rario50Label.textContent = "50%";
  rario50Label.classList.add("form-check-label");

  const radio50Div = document.createElement("div");
  radio50Div.classList.add("form-check", "my-3");
  
  radio10Div.appendChild(radio10);
  radio25Div.appendChild(radio25);
  radio50Div.appendChild(radio50);
  radio10Div.appendChild(rario10Label);
  radio25Div.appendChild(rario25Label);
  radio50Div.appendChild(rario50Label);

  // Agregar a div principal
  divFormulario.appendChild(heading);
  divFormulario.appendChild(radio10Div);
  divFormulario.appendChild(radio25Div);
  divFormulario.appendChild(radio50Div);

  // Agrergar al formulario
  formulario.appendChild(divFormulario);
  
  contenido.appendChild(formulario);
}

function calcularPropina(){
  const {pedidos} = cliente;
  let subtotal = 0;

  pedidos.forEach(articulo => {
    subtotal += articulo.cantidad * articulo.precio;
  });

  //Seleccionar el radio button con la propina del cliente
  const propinaSeleccionada = document.querySelector('input[name="propina"]:checked').value;

  // Calcular la propina
  const propina = ((subtotal * parseInt (propinaSeleccionada)) / 100);
  const total = subtotal + propina;

  mostrarTotaHTML(subtotal, propina, total);

}
function mostrarTotaHTML(subtotal, propina, total){

  const divTotales = document.createElement("div");
 divTotales.classList.add("total-pagar")


  const subtotalParrafo = document.createElement("p");
  subtotalParrafo.classList.add("fs-3", "fw-bold", "mt-3");
  subtotalParrafo.textContent = "Subtotal Consumo"

  const subtotalSpan = document.createElement("span");
  subtotalSpan.classList.add("fw-normal");
  subtotalSpan.textContent = ` $${subtotal}`;

  subtotalParrafo.appendChild(subtotalSpan);
  divTotales.appendChild(subtotalParrafo);

  // Propina
  const propinaParrafo = document.createElement("p");
  propinaParrafo.classList.add("fs-3", "fw-bold", "mt-3");
  propinaParrafo.textContent = "Propina"

  const propinaSpan = document.createElement("span");
  propinaSpan.classList.add("fw-normal");
  propinaSpan.textContent = ` $${propina}`;

  propinaParrafo.appendChild(propinaSpan);
  divTotales.appendChild(propinaParrafo);

  // Total
  const totalParrafo = document.createElement("p");
  totalParrafo.classList.add("fs-3", "fw-bold", "mt-3");
  totalParrafo.textContent = "Total a Pagar"

  const totalSpan = document.createElement("span");
  totalSpan.classList.add("fw-normal");
  totalSpan.textContent = ` $${total}`;

  totalParrafo.appendChild(totalSpan);
  divTotales.appendChild(totalParrafo);

  // eliminar totales

  const totalesAnteriores = document.querySelectorAll(".total-pagar");
  if(totalesAnteriores.length){
    totalesAnteriores.forEach(total => {
      total.remove();
    });
  }

  const formulario = document.querySelector(".formulario > div");
  formulario.appendChild(divTotales);
}