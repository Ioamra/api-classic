import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API classic',
            version: '1.0.0',
            description: 'Structure de base d\'une API',
        },
    },
    apis: ['src/controllers/**/*.ts', 'src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
