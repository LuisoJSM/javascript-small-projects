const brand = document.querySelector("#brand");
const year = document.querySelector("#year");
const priceMin = document.querySelector("#min-price");
const priceMax = document.querySelector("#max-price");
const doors = document.querySelector("#doors");
const transmission = document.querySelector("#transmission");
const color = document.querySelector("#color");

// Results container
const result = document.querySelector("#results");

// Min and max years
const max = new Date().getFullYear();
const min = max - 10;

// Search object
const search = {
  brand: "",
  year: "",
  priceMin: "",
  priceMax: "",
  doors: "",
  transmission: "",
  color: "",
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showCars(cars);
  fillSelectYears();
  fillBrands();
  fillColors();
  fillDoors();
  fillTransmissions();
  fillPrices();
});

// Event listeners
brand.addEventListener("change", (e) => {
  search.brand = e.target.value;
  filterCar();
});

year.addEventListener("change", (e) => {
  search.year = e.target.value;
  filterCar();
});

priceMin.addEventListener("change", (e) => {
  search.priceMin = e.target.value;
  filterCar();
});

priceMax.addEventListener("change", (e) => {
  search.priceMax = e.target.value;
  filterCar();
});

doors.addEventListener("change", (e) => {
  search.doors = e.target.value;
  filterCar();
});

transmission.addEventListener("change", (e) => {
  search.transmission = e.target.value;
  filterCar();
});

color.addEventListener("change", (e) => {
  search.color = e.target.value;
  filterCar();
});

// Show cars in DOM
function showCars(cars) {
  cleanHTML();

  cars.forEach((car) => {
    const carHTML = document.createElement("p");

    const { brand, model, year, price, doors, color, transmission } = car;
    carHTML.textContent = `
      ${brand} ${model} - Year: ${year} - Doors: ${doors} - Color: ${color} - Transmission: ${transmission} - Price: $${price}
    `;

    result.appendChild(carHTML);
  });
}

// Clear HTML results
function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

// Fill select with years
function fillSelectYears() {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}
// Fill dynamic selects from JSON data
function fillBrands() {
  const uniqueBrands = [...new Set(cars.map((car) => car.brand))].sort();
  uniqueBrands.forEach((brandName) => {
    const option = document.createElement("option");
    option.value = brandName;
    option.textContent = brandName;
    brand.appendChild(option);
  });
}

function fillColors() {
  const uniqueColors = [...new Set(cars.map((car) => car.color))].sort();
  uniqueColors.forEach((colorName) => {
    const option = document.createElement("option");
    option.value = colorName;
    option.textContent = colorName;
    color.appendChild(option);
  });
}

function fillDoors() {
  const uniqueDoors = [...new Set(cars.map((car) => car.doors))].sort(
    (a, b) => a - b
  );
  uniqueDoors.forEach((doorCount) => {
    const option = document.createElement("option");
    option.value = doorCount;
    option.textContent = doorCount;
    doors.appendChild(option);
  });
}

function fillTransmissions() {
  const uniqueTransmissions = [
    ...new Set(cars.map((car) => car.transmission)),
  ].sort();
  uniqueTransmissions.forEach((trans) => {
    const option = document.createElement("option");
    option.value = trans;
    option.textContent = trans.charAt(0).toUpperCase() + trans.slice(1); // capitaliza
    transmission.appendChild(option);
  });
}

function fillPrices() {
  // crea rangos de precios redondeados de forma automática
  const prices = cars.map((car) => car.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const steps = [20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000];
  steps.forEach((step) => {
    const optionMin = document.createElement("option");
    optionMin.value = step;
    optionMin.textContent = `$${step.toLocaleString()}`;
    priceMin.appendChild(optionMin);

    const optionMax = document.createElement("option");
    optionMax.value = step;
    optionMax.textContent = `$${step.toLocaleString()}`;
    priceMax.appendChild(optionMax);
  });
}

// Filter functions
function filterCar() {
  const filtered = cars
    .filter(filterBrand)
    .filter(filterYear)
    .filter(filterMin)
    .filter(filterMax)
    .filter(filterDoors)
    .filter(filterTransmission)
    .filter(filterColor);

  if (filtered.length) {
    showCars(filtered);
  } else {
    noResult();
  }

  function noResult() {
    cleanHTML();
    const noResult = document.createElement("div");
    noResult.classList.add("alert", "error");
    noResult.textContent = "No cars found";
    result.appendChild(noResult);
  }
}

function filterBrand(car) {
  const { brand } = search;
  if (brand) {
    return car.brand === brand;
  }
  return car;
}

function filterYear(car) {
  const { year } = search;
  if (year) {
    return car.year === parseInt(year);
  }
  return car;
}

function filterMin(car) {
  const { priceMin } = search;
  if (priceMin) {
    return car.price >= parseInt(priceMin);
  }
  return car;
}

function filterMax(car) {
  const { priceMax } = search;
  if (priceMax) {
    return car.price <= parseInt(priceMax);
  }
  return car;
}

function filterDoors(car) {
  const { doors } = search;
  if (doors) {
    return car.doors === parseInt(doors);
  }
  return car;
}

function filterTransmission(car) {
  const { transmission } = search;
  if (transmission) {
    return car.transmission === transmission;
  }
  return car;
}

function filterColor(car) {
  const { color } = search;
  if (color) {
    return car.color === color;
  }
  return car;
}
