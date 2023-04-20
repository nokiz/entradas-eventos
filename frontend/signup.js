// Obtener referencia al formulario
const signupForm = document.querySelector("#signup-form");

// Agregar evento al formulario al enviar
signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener valores del formulario
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  userLoginOrSignup(email, password, "signup");
});