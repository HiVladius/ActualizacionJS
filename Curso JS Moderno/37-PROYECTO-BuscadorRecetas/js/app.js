function iniciarApp() {
  // Seleccionar el formulario
  const selectCategorias = document.querySelector("#categorias");
  selectCategorias.addEventListener("change", manejarSeleccionCategoria);

  const resultado = document.querySelector("#resultado");
  const modal = new bootstrap.Modal("#modal", {});

  obtenerCategorias();

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
    btnFavorito.textContent = "Guardar favoritos";

    const btnCerrrarModal = document.createElement("button");
    btnCerrrarModal.classList.add("btn", "btn-secondary", "col");
    btnCerrrarModal.textContent = "Cerrar";
    btnCerrrarModal.setAttribute("data-bs-dismiss", "modal");

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrrarModal);

    // Muestra el modal
    modal.show();
  }

  function limpiarHTML(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);
