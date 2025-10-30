// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// Cargar todos los event listeners
cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  // Eliminar curso del carrito (CORRECTO: sin paréntesis)
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar carrito completo
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // vacía el arreglo
    limpiarHTML(); // elimina el HTML
  });
}

// ==========================
// Funciones
// ==========================

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del array por id
    articulosCarrito = articulosCarrito.filter(
      (curso) => curso.id !== cursoId
    );

    carritoHTML(); // vuelve a renderizar el carrito
  }
}

// Agrega un curso al carrito
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

// Lee los datos del curso seleccionado
function leerDatosCursos(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si el curso ya existe
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    articulosCarrito = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
      }
      return curso;
    });
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
    `;

    contenedorCarrito.appendChild(row);
  });
}

// Limpia el contenido del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
