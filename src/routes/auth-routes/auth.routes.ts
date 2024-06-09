import express, { Request, Response } from "express";
import { logIn } from "../../controllers/auth-controllers/logIn.controller";

export const router = express.Router();


// router.post('/account-activation/:jwt', async (req: Request, res: Response) => {
//     let jwt = req.params.jwt as string;
//     let password_one = req.body.password_one as string;
//     let password_two = req.body.password_two as string;
//     accountActivation(jwt, password_one, password_two, res);
// });

router.post('/login', async (req: Request, res: Response) => {
    let mail = req.body.mail as string;
    let password = req.body.password as string;
    logIn(mail, password, res, req);
});

// router.post('/forgot-password', async (req: Request, res: Response) => {
//     let mail = req.body.mail as string;
//     forgotPassword(mail, res);
// });