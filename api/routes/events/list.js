async function eventRoutes(fastify, options) {
    fastify.get('/events/list', async (request, reply) => {
      const events = [
        { id: 1, name: 'Blur at Wembley 2023' },
        { id: 2, name: 'Low Festival 2023' }
      ];
      return events;
    });
  }
  
  module.exports = eventRoutes;