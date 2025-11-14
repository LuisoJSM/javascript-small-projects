// Variables y Selectores
const form = document.querySelector("#agregar-gasto");
const expensesList = document.querySelector("#gastos ul");

let budget;

// Eventos
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", askBudget);
  form.addEventListener("submit", addExpense);
}

// Clases
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.balance = Number(budget);
    this.expenses = [];
  }

  newExpense(expense) {
    this.expenses = [...this.expenses, expense];
    console.log(this.expenses);
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    console.log(this.expenses);
  }
}

class UserInterface {
  insertBudget(amount) {
    const { budget, balance } = amount;
    document.querySelector("#total").textContent = budget;
    document.querySelector("#restante").textContent = balance;
  }

  showAlert(message, type) {
    const divMessage = document.createElement("DIV");
    divMessage.classList.add("text-center", "alert");

    if (type === "error") {
      divMessage.classList.add("alert-danger");
    } else {
      divMessage.classList.add("alert-success");
    }

    divMessage.textContent = message;

    // Insert into HTML
    document.querySelector(".primario").insertBefore(divMessage, form);

    // Remove
    setTimeout(() => {
      divMessage.remove();
    }, 2000);
  }

  addExpense(expenses) {
    // Clean previous HTML
    while (expensesList.firstChild) {
      expensesList.removeChild(expensesList.firstChild);
    }

    
    expenses.forEach(expense => {
      const { amount, name, id } = expense;

      const newExpense = document.createElement("LI");
      newExpense.className =
        "list-group-item d-flex justify-content-between align-items-center";
      newExpense.dataset.id = id;

      newExpense.innerHTML = `
        ${name} <span class="badge badge-primary badge-pill">${amount}</span>
      `;

      const btnRemove = document.createElement("button");
      btnRemove.classList.add("btn", "btn-danger", "borrar-gasto", "btn-sm");
      btnRemove.textContent = "Borrar x";
      btnRemove.onclick = () => {
        removeExpense(id);
      };

      newExpense.appendChild(btnRemove);
      expensesList.appendChild(newExpense);
    });
  }
}

const ui = new UserInterface();

// Funciones
function askBudget() {
  const userBudget = prompt("¿Cuál es tu presupuesto?");
  console.log(parseFloat(userBudget));

  if (
    userBudget === "" ||
    userBudget === null ||
    isNaN(userBudget) ||
    userBudget <= 0
  ) {
    window.location.reload();
    return;
  }

  budget = new Budget(userBudget);
  console.log(budget);

  ui.insertBudget(budget);
}

// Add Expense
function addExpense(e) {
  e.preventDefault();

  const name = document.querySelector("#gasto").value;
  const amount = Number(document.querySelector("#cantidad").value);

  if (name === "" || isNaN(amount)) {
    ui.showAlert("Ambos campos son obligatorios", "error");
    return;
  } else if (amount <= 0 || isNaN(amount)) {
    ui.showAlert("Cantidad no válida", "error");
    return;
  }

  const expense = { name, amount, id: Date.now() };

  budget.newExpense(expense);
  ui.showAlert("Gasto agregado correctamente");

  const { expenses } = budget;
  ui.addExpense(expenses);

  form.reset();
}

// Eliminar gasto
function removeExpense(id) {
  budget.removeExpense(id);
  const { expenses } = budget;
  ui.addExpense(expenses);
}
