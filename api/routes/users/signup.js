const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

async function userSignupRoutes(fastify, options) {
  //fastify.register(require("@fastify/formbody"));

  /*await fastify.register(require("@fastify/cors"), {
    origin: "*",
    methods: ["GET", "POST"],
  });*/

  fastify.post('/users/signup', async (request, reply) => {
    const { email, password } = request.body;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user created and logged in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error');
      });
  });
}

module.exports = userSignupRoutes;