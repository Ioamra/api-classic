import cors from 'cors';
import express, { Express } from 'express';
import helmet from "helmet";
import { testRouter } from './test-routes/test.routes';
import { Middleware } from '../middleware/middleware.config';

export default class RoutingConfig {
    public static init(app: Express): void {
        app.use(express.json({ limit: '5000mb' }));
        app.use(express.urlencoded({ limit: '5000mb', extended: true }));
        app.use(cors());
        app.use(helmet());

        // Import des routes
        app.use('/test', Middleware.requireAuthentication, testRouter);

    }
};