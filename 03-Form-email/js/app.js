document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    cc: "",
    subject: "",
    message: "",
  };

  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const inputCc = document.querySelector("#cc");
  const form = document.querySelector("#form");
  const btnSubmit = document.querySelector('#form button[type="submit"]');
  const btnReset = document.querySelector('#form button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Events
  inputEmail.addEventListener("input", validateField);
  inputCc.addEventListener("input", validateField);
  inputSubject.addEventListener("input", validateField);
  inputMessage.addEventListener("input", validateField);

  form.addEventListener("submit", sendEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetForm();
  });

  function sendEmail(e) {
    e.preventDefault(e);

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      resetForm();

      const alertExit = document.createElement('P');
      alertExit.classList.add('bg-green-500','text-white', 'p-2', 'text-center','rounded-lg', 'mt-10','font-bold', 'text-sm', 'uppercase' );

      alertExit.textContent = 'message sent successfully';
      form.appendChild(alertExit);

      setTimeout(() => {
        alertExit.remove();
      }, 2000)


    }, 3000);
  }

  
function validateField(e) {

  if (e.target.value.trim() === "") {
    showAlert(
      `The field ${e.target.id} is required.`,
      e.target.parentElement
    );
    email[e.target.name] = "";
    checkEmail();
    return;
  }

  if (e.target.id === "email" && !validateEmail(e.target.value)) {
    showAlert("The email is not valid.", e.target.parentElement);
    email[e.target.name] = "";
    checkEmail();
    return;
  }

  
  if (e.target.id === "cc" && e.target.value.trim() !== "" && !validateEmail(e.target.value)) {
    showAlert("The CC email is not valid.", e.target.parentElement);
    email[e.target.name] = "";
    checkEmail();
    return;
  }
 

  clearAlert(e.target.parentElement);

  email[e.target.name] = e.target.value.trim().toLowerCase();

  checkEmail();
}






  function showAlert(message, reference) {
    clearAlert(reference);

    const error = document.createElement("P");
    error.textContent = message;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    reference.appendChild(error);
  }

  function clearAlert(reference) {
    const alert = reference.querySelector(".bg-red-600");
    if (alert) {
      alert.remove();
    }
  }

  function validateEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    console.log(result);
    return result;
  }

  function checkEmail() {
    console.log(email);
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  function resetForm() {
    email.email = "";
    email.cc = "";
    email.message = "";
    email.subject = "";

    form.reset();
    checkEmail();
  }
});
