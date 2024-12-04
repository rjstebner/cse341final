const swaggetAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Users Api',
        description: 'This is a simple CRUD API for users and products',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/creatureSpe.js', './routes/creatureGen.js', './routes/items.js'];

swaggetAutogen(outputFile, endpointsFiles, doc);