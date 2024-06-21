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

        /**
         * @swagger
         * tags:
         *   name: Authentication
         *   description: API endpoints for user authentication
         */
        app.use('/auth', authRouter);

        // Routes de test
        /**
         * @swagger
         * tags:
         *   name: Testing
         *   description: API endpoints for testing purposes
         */
        app.use('/test', Middleware.requireAuthentication, testRouter);

        // Routes d'utilisateurs
        /**
         * @swagger
         * tags:
         *   name: Users
         *   description: API endpoints for user-related operations
         */
        app.use('/users', Middleware.requireAuthentication, usersRouter);

        // Routes d'administration
        /**
         * @swagger
         * tags:
         *   name: Admin
         *   description: API endpoints for admin operations
         */
        app.use('/admin', Middleware.requireAdmin, adminRouter);
    }
}
