const addButton = document.getElementById("addButton");
const clearButton = document.querySelector(".btn-danger");
const inputTarea = document.getElementById("tarea");
const lista = document.querySelector("#tareas ul");

function agregarTarea(e) {
  e.preventDefault();
  const texto = inputTarea.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  li.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "ml-2");

  btnEliminar.addEventListener("click", () => li.remove());

  li.appendChild(btnEliminar);
  lista.appendChild(li);

  inputTarea.value = "";
}

function limpiarTareas(e) {
  e.preventDefault();
  lista.innerHTML = "";
}

addButton.addEventListener("click", agregarTarea);
clearButton.addEventListener("click", limpiarTareas);
