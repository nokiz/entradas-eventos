function userLoginOrSignup(email, password, endpoint) {
  fetch("http://127.0.0.1:3000/users/" + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        //return response.json(); // Devuelve la respuesta como un objeto JSON
        console.log("Response ok");
      } else {
        console.error("ERROR: Response not ok");
      }
    });
}
