// Obtener referencia al formulario
const signupForm = document.querySelector('#signup-form');

// Agregar evento al formulario al enviar
signupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener valores del formulario
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  fetch('http://127.0.0.1:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Devuelve la respuesta como un objeto JSON
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data); // Hacer algo con la respuesta del servidor
    })
    .catch(error => {
      console.error('Error:', error);
    });
});