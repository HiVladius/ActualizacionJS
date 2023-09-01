function iniciarApp() {
  // Seleccionar el formulario

  const resultado = document.querySelector("#resultado");
  const selectCategorias = document.querySelector("#categorias");

  if (selectCategorias) {
    selectCategorias.addEventListener("change", manejarSeleccionCategoria);
    obtenerCategorias();
  }

  const favoritosDiv = document.querySelector(".favoritos");
  if (favoritosDiv) {
    obtenerFavoritos();
  }

  
  const modal = new bootstrap.Modal("#modal", {});

  function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php"; // URL de la API
    fetch(url) // llamado a una URL
      .then((respuesta) => respuesta.json())
      .then((resultado) => mostrarCategorias(resultado.categories));
  }

  function mostrarCategorias(categorias = []) {
    categorias.forEach((categoria) => {
      const { strCategory } = categoria;
      const option = document.createElement("option");
      option.value = strCategory;
      option.textContent = strCategory;
      selectCategorias.appendChild(option);
    });
  }

  function manejarSeleccionCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    fetch(url) // llamado a una URL
      .then((respuesta) => respuesta.json())
      .then((resultado) => obtenerRecetas(resultado.meals));
  }

  function obtenerRecetas(recetas = []) {
    limpiarHTML(resultado);

    const heading = document.createElement("h2");
    heading.classList.add("text-center", "mb-4");
    heading.textContent = recetas.length ? "Ta daaa!" : "No hay recetas";
    resultado.appendChild(heading);

    //iterar sobre el arreglo de recetas

    recetas.forEach((receta) => {
      const { strMeal, strMealThumb, idMeal } = receta;

      const recetaContenedor = document.createElement("div");
      recetaContenedor.classList.add("col-md-4");

      const recetasCard = document.createElement("div");
      recetasCard.classList.add("card", "mt-4");

      const recetaImagen = document.createElement("img");
      recetaImagen.classList.add("card-img-top");
      recetaImagen.alt = `Imagen de ${strMeal}`;
      recetaImagen.src = strMealThumb;

      const recetaCardBody = document.createElement("div");
      recetaCardBody.classList.add("card-body");

      const recetaHeading = document.createElement("h3");
      recetaHeading.classList.add("card-title", "mb-3");
      recetaHeading.textContent = strMeal;

      const recetaBoton = document.createElement("a");
      recetaBoton.classList.add("btn", "btn-danger", "w-100");
      recetaBoton.textContent = "Ver receta";
      //  recetaBoton.dataset.bsTarget = "#modal";
      //   recetaBoton.dataset.bsToggle = "modal";
      recetaBoton.onclick = () => {
        mostrarReceta(idMeal);
      };

      // insertar en el HTML

      recetaCardBody.appendChild(recetaHeading);
      recetaCardBody.appendChild(recetaBoton);

      recetasCard.appendChild(recetaImagen);
      recetasCard.appendChild(recetaCardBody);

      recetaContenedor.appendChild(recetasCard);
      resultado.appendChild(recetaContenedor);
    });
  }

  function mostrarReceta(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url) // llamado a una URL
      .then((respuesta) => respuesta.json())
      .then((resultado) => mostrarRecetaModal(resultado.meals[0]));
  }

  function mostrarRecetaModal(receta) {
    // Nuestra el modal

    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    // Añaadir los datos al modal
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = `
        <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}">
        <h3>Ingredientes</h3>
        <p>${strInstructions}</p>
        <h3 class="my-3">Ingredientes y cantidades</h3>
        `;
    const listGroup = document.createElement("ul");
    listGroup.classList.add("list-group");

    //Mostar cantidad e ingredientes
    for (let i = 1; i <= 16; i++) {
      if (receta[`strIngredient${i}`]);
      const ingrediente = receta[`strIngredient${i}`];
      const cantidad = receta[`strMeasure${i}`];

      const ingredienteLi = document.createElement("li");
      ingredienteLi.classList.add("list-group-item");
      ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

      listGroup.appendChild(ingredienteLi);
    }

    modalBody.appendChild(listGroup);

    // Mostrar el footer del modal
    const modalFooter = document.querySelector(".modal-footer");
    limpiarHTML(modalFooter);

    //Boton de cerrar y faborito
    const btnFavorito = document.createElement("button");
    btnFavorito.classList.add("btn", "btn-danger", "col");
    btnFavorito.textContent = existeStorage(idMeal)
      ? "Eliminar  favorito"
      : "Agregar a favoritos";

    // Almacena en el local storage
    btnFavorito.onclick = () => {
      if (existeStorage(idMeal)) {
        eliminarFavorito(idMeal);
        btnFavorito.textContent = "Agregar a favoritos";
        mostrarToast("Se elimino de favoritos");
        return;
      }

      agregarFavorito({
        idMeal,
        strMeal,
        strMealThumb,
      });
      btnFavorito.textContent = "Eliminar favorito";
      mostrarToast("Se agrego a favoritos");
    };

    const btnCerrrarModal = document.createElement("button");
    btnCerrrarModal.classList.add("btn", "btn-secondary", "col");
    btnCerrrarModal.textContent = "Cerrar";
    btnCerrrarModal.onclick = () => {
      modal.hide();
    };

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrrarModal);

    // Muestra el modal
    modal.show();
  }

  function agregarFavorito(receta) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    localStorage.setItem("favoritos", JSON.stringify([...favoritos, receta]));
  }

  function eliminarFavorito(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const nuevosFavoritos = favoritos.filter(
      (favorito) => favorito.idMeal !== id
    );
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  }

  function existeStorage(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritos.some((favorito) => favorito.idMeal === id);
  }

  function mostrarToast(mensaje) {
    const toastDiv = document.querySelector(".toast");
    const toastBody = document.querySelector(".toast-body");
    const toast = new bootstrap.Toast(toastDiv);
    toastBody.textContent = mensaje;
    toast.show();
  }

  function obtenerFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
   console.log(favoritos);
    if (favoritos.length) {
      obtenerRecetas(favoritos);
      return 
    }

    const noFavoritos = document.createElement("p");
    noFavoritos.textContent = "No hay favoritos";
    noFavoritos.classList.add("fs-4", "text-center", "font-bold", "mt-5");
    favoritosDiv.appendChild(noFavoritos);
  }

  function limpiarHTML(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);
