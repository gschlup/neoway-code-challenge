const fastify = require('fastify')({ logger: true });

const DocumentController = require('./controllers/DocumentController');
const StatusController = require('./controllers/StatusController');

global._requestsCount = {
  total: 0,
  success: 0,
  error: 0
};

// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
});

fastify.get('/document', DocumentController.getAll);
fastify.post('/document', DocumentController.create);
fastify.patch('/document/:id/block', DocumentController.updateBlockStatus);
fastify.delete('/document/:id', DocumentController.delete)
fastify.get('/status', StatusController.getStatus);

// Run the server!
fastify.listen({ port: 4000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});

module.exports = fastify;