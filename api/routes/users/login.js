//const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
/*
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBixMhGCtnK1gurtJPAWiaoUavgn_qzy_4",
  authDomain: "curso-flutter-41d49.firebaseapp.com",
  databaseURL: "https://curso-flutter-41d49-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "curso-flutter-41d49",
  storageBucket: "curso-flutter-41d49.appspot.com",
  messagingSenderId: "970311993569",
  appId: "1:970311993569:web:1f37b115d9e91c37090fa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/

// Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(app);

async function usersLoginRoutes(fastify, options) {
  fastify.register(require("@fastify/formbody"));

  await fastify.register(require("@fastify/cors"), {
    origin: "*",
    methods: ["GET", "POST"],
  });

  fastify.post("/users/login", async (request, reply) => {
    const { email, password } = request.body;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email + ' logged in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  });
}

module.exports = usersLoginRoutes;