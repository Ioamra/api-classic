import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import { createServer } from 'http';
import RoutingConfig from './src/routes/routing.config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.config';

dotenv.config({path: './src/config/.env'});

// Configuration des dépendances
const app: Express = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
RoutingConfig.init(app);

// Configuration du serveur
const http = createServer(app);

const port = process.env.MODE === 'prod' ? process.env.PORT_PROD : process.env.PORT_DEV;
const host = process.env.MODE === 'prod' ? process.env.HOST_PROD : process.env.HOST_DEV;

// Lancement du serveur
http.listen(port, async () => {
    console.log('Votre serveur est prêt à l\'adresse suivante : \n');
    process.env.MODE === 'prod'? console.info(`https://${host}:${port}\n`) : console.info(`http://${host}:${port}\n`);
});