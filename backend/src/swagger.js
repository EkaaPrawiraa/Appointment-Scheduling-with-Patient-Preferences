const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'All Api',
    },
    servers: [
        {
            url: 'http://localhost:5001/api',
            description: 'API server'
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: ['src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerSetup;
