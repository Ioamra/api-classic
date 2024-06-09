import cors from 'cors';
import express, { Express } from 'express';
import helmet from "helmet";
import { testRouter } from './general-routes/test.routes';
import { Middleware } from '../middleware/middleware.config';
import { authRouter } from './general-routes/auth.routes';
import { usersRouter } from './general-routes/users.routes';
import { adminRouter } from './admin-routes/usersAdmin.routes';

export default class RoutingConfig {
    public static init(app: Express): void {
        app.use(express.json({ limit: '5000mb' }));
        app.use(express.urlencoded({ limit: '5000mb', extended: true }));
        app.use(cors());
        app.use(helmet());

        // Import des routes
        app.use('/auth', authRouter);
        app.use('/test', Middleware.requireAuthentication, testRouter);
        app.use('/users', Middleware.requireAuthentication, usersRouter);
        app.use('/admin', Middleware.requireAdmin, adminRouter);
    }
};