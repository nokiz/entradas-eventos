// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// Require firebase
const { initializeApp } = require('firebase/app');

// Require env module and instantiate it
const dotenv = require('dotenv');
dotenv.config();

// Importa routes
const eventRoutes = require('./routes/events/list');
const usersLoginRoutes = require('./routes/users/login');
const userSignupRoutes = require('./routes/users/signup');

// Register routes
fastify.register(eventRoutes);
fastify.register(usersLoginRoutes);
fastify.register(userSignupRoutes);

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
const app = initializeApp(firebaseConfig);

// Define listening options
const options = {
  port: process.env.SERVER_PORT,
  // Puedes agregar otras opciones aquí, como la dirección IP o el número de workers
};

const authorized = false;

// Middleware para verificar la autenticación
const checkAuth = (request, reply, done) => {
  if (authorized) {
    done();
  } else {
    reply.status(403).send('Unauthorized!');
  }
};

// Ruta base
fastify.get('/', async (request, reply) => {
  return { message: `Hello, world!` };
});

// Ruta protegida por autenticación
fastify.get('/protected', { preHandler: checkAuth }, async (request, reply) => {
  return { message: `Secret!` };
});

// Start server
const start = async () => {
  try {
    await fastify.listen(options);
    fastify.log.info(`Servidor escuchando en ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();