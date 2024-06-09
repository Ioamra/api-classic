import express, { Request, Response } from "express";
import { getMyInfo } from "../../controllers/general-controllers/users-controllers/getMyInfo.controller";
import AuthenticationService from "../../config/jwt.config";
import { AccessTokenDecoded } from "../../models/jwt.model";

export const usersRouter = express.Router();

usersRouter.get('/myInfo', async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const id_users = (AuthenticationService.decodeToken(token) as AccessTokenDecoded).id_users;
    getMyInfo(id_users, res);
});