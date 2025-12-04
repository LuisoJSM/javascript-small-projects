
const form = document.querySelector("#agregar-gasto");
const expensesList = document.querySelector("#gastos ul");

let budget;


eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", askBudget);
  form.addEventListener("submit", addExpense);
}


class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.balance = Number(budget);
    this.expenses = [];
  }

  newExpense(expense) {
    this.expenses = [...this.expenses, expense];
    this.remainingBudget();
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.remainingBudget();
  }

  remainingBudget() {
    const spent = this.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    this.balance = this.budget - spent;
  }
}

class UserInterface {
  insertBudget(amount) {
    const { budget, balance } = amount;
    document.querySelector("#total").textContent = budget;
    document.querySelector("#restante").textContent = balance;
    this.colorBalance(balance, budget);
  }

  updateBalance(balance, total) {
    document.querySelector("#restante").textContent = balance;
    this.colorBalance(balance, total);
  }

  colorBalance(balance, total) {
    const restanteDiv = document.querySelector(".restante");

    restanteDiv.classList.remove("alert-success", "alert-warning", "alert-danger");

    const percentage = (balance / total) * 100;

    if (percentage < 25) {
      restanteDiv.classList.add("alert-danger");
    } else if (percentage < 50) {
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.add("alert-success");
    }
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

    document.querySelector(".primario").insertBefore(divMessage, form);

    setTimeout(() => {
      divMessage.remove();
    }, 2000);
  }

  addExpense(expenses) {
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
        ${name} <span class="badge badge-primary badge-pill">$ ${amount}</span>
      `;

      const btnRemove = document.createElement("button");
      btnRemove.classList.add("btn", "btn-danger", "borrar-gasto", "btn-sm");
      btnRemove.textContent = "Borrar x";
      btnRemove.onclick = () => removeExpense(id);

      newExpense.appendChild(btnRemove);
      expensesList.appendChild(newExpense);
    });
  }
}

const ui = new UserInterface();


function askBudget() {
  const userBudget = prompt("¿Cuál es tu presupuesto?");

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
  } else if (amount <= 0) {
    ui.showAlert("Cantidad no válida", "error");
    return;
  }

  const expense = { name, amount, id: Date.now() };

  budget.newExpense(expense);
  ui.showAlert("Gasto agregado correctamente");

  const { expenses, balance, budget: total } = budget;

  ui.addExpense(expenses);
  ui.updateBalance(balance, total);

  form.reset();
}


function removeExpense(id) {
  budget.removeExpense(id);

  const { expenses, balance, budget: total } = budget;

  ui.addExpense(expenses);
  ui.updateBalance(balance, total);

  ui.showAlert("Gasto eliminado y presupuesto actualizado", "success");
}
