import express, { Request, Response } from "express";
import { logIn } from "../../controllers/general-controllers/auth-controllers/logIn.controller";
import { register } from "../../controllers/general-controllers/auth-controllers/register.controller";

export const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_users:
 *                 type: string
 *               password_users:
 *                 type: string
 *             required:
 *               - email_users
 *               - password_users
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
authRouter.post('/login', async (req: Request, res: Response) => {
    let email_users = req.body.email_users as string;
    let password_users = req.body.password_users as string;
    logIn(email_users, password_users, res);
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username_users:
 *                 type: string
 *               name_users:
 *                 type: string
 *               email_users:
 *                 type: string
 *               password_users:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Registration failed
 */
authRouter.post('/register', async (req: Request, res: Response) => {
    let data = req.body;
    register(data, res);
});


// authRouter.post('/account-activation/:jwt', async (req: Request, res: Response) => {
//     let jwt = req.params.jwt as string;
//     let password_one = req.body.password_one as string;
//     let password_two = req.body.password_two as string;
//     accountActivation(jwt, password_one, password_two, res);
// });

// authRouter.post('/forgot-password', async (req: Request, res: Response) => {
//     let mail = req.body.mail as string;
//     forgotPassword(mail, res);
// });