// Obtener referencia al formulario
const loginForm = document.querySelector("#login-form");

// Agregar evento al formulario al enviar
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener valores del formulario
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  userLoginOrSignup(email, password, "login");
});