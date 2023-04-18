// Obtener referencia al formulario
const loginForm = document.querySelector('#login-form');

// Agregar evento al formulario al enviar
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener valores del formulario
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  fetch('http://127.0.0.1:3000/users/login', {
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