import dotenv from 'dotenv';
import express, { Express } from 'express';
import { createServer } from 'http';
import RoutingConfig from './src/routes/routing.config';

dotenv.config({path: './src/config/.env'});

// Configuration des dépendances
const app: Express = express();
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