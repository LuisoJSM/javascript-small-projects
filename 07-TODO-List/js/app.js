const addButton = document.getElementById("addButton");

function agregarTarea() {
  const tarea = document.getElementById("tarea").value;
  console.log(tarea);
}

addButton.addEventListener('click', agregarTarea);
