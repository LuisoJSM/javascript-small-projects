// Constructor for Insurance objects
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

// Calculates the insurance quote based on brand, year, and type
Insurance.prototype.quoteInsurance = function () {
  let amount;
  const base = 2000;

  // Adjust price based on car brand
  switch (this.brand) {
    case "1":
      amount = base * 1.15;
      break;
    case "2":
      amount = base * 1.05;
      break;
    case "3":
      amount = base * 1.35;
      break;
  }

  // Apply depreciation based on car age
  const diference = new Date().getFullYear() - this.year;
  amount -= (diference * 3 * amount) / 100;

  // Adjust final amount by insurance type
  if (this.type === "basico") {
    amount *= 1.3;
  } else {
    amount *= 1.5;
  }

  return amount.toFixed(2);
};

// UI constructor (for interface methods)
function UI() {}

// Populate year options dynamically
UI.prototype.fillOptions = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const selectYear = document.querySelector("#year");

  for (let i = max; i >= min; i--) {
    let option = document.createElement("OPTION");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Display alert messages in the form
UI.prototype.showMessage = (message, type) => {
  const div = document.createElement("div");
  div.classList.add("mensaje", "mt-10");
  div.classList.add(type === "error" ? "error" : "correcto");
  div.textContent = message;

  const form = document.querySelector("#cotizar-seguro");
  form.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => div.remove(), 3000);
};

// Show the insurance quote result
UI.prototype.showResult = (totalAmount, insurance) => {
  // Destructure data from insurance object
  const { brand, year, type } = insurance;

  let brandName;
  switch (brand) {
    case "1":
      brandName = "American";
      break;
    case "2":
      brandName = "Asian";
      break;
    case "3":
      brandName = "European";
      break;
  }

  // Build result HTML
  const div = document.createElement("DIV");
  div.classList.add("mt-10");
  div.innerHTML = `
    <p class="header">Your summary:</p>
    <p class="font-bold">Brand: <span class="font-normal">${brandName}</span></p>
    <p class="font-bold">Year: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Type: <span class="font-normal capitalize">${type}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$${totalAmount}</span></p>
  `;

  const resultDiv = document.querySelector("#resultado");

  // Show spinner before displaying result
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none"; // hide spinner
    resultDiv.appendChild(div); // show result
  }, 3000);
};

// Create UI instance
const ui = new UI();

// Fill year options when the page loads
document.addEventListener("DOMContentLoaded", () => {
  ui.fillOptions();
});

// Initialize event listeners
eventListeners();

function eventListeners() {
  const form = document.querySelector("#cotizar-seguro");
  form.addEventListener("submit", quoteInsurance);
}

// Handle form submission and calculate insurance
function quoteInsurance(e) {
  e.preventDefault();

  const brand = document.querySelector("#marca").value;
  const year = document.querySelector("#year").value;
  const type = document.querySelector('input[name="tipo"]:checked')?.value;

  if (brand === "" || year === "" || !type) {
    ui.showMessage("All fields are required", "error");
    return;
  }

  ui.showMessage("Calculating...", "correcto");

  // Remove previous result if it exists
  const results = document.querySelector("#resultado div");
  if (results) results.remove();

  // Create insurance object
  const insurance = new Insurance(brand, year, type);
  const totalAmount = insurance.quoteInsurance();

  // Show result
  ui.showResult(totalAmount, insurance);
}
