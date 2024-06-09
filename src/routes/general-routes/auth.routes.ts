import express, { Request, Response } from "express";
import { logIn } from "../../controllers/general-controllers/auth-controllers/logIn.controller";
import { register } from "../../controllers/general-controllers/auth-controllers/register.controller";

export const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    let email_users = req.body.email_users as string;
    let password_users = req.body.password_users as string;
    logIn(email_users, password_users, res);
});

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