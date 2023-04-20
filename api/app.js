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
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Define listening options
const options = {
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
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