import express, { Request, Response } from "express";
import { getMyInfo } from "../../controllers/general-controllers/users-controllers/getMyInfo.controller";
import AuthenticationService from "../../config/jwt.config";
import { AccessTokenDecoded } from "../../models/jwt.model";

export const usersRouter = express.Router();

/**
 * @swagger
 * /users/myInfo:
 *   get:
 *     summary: Get user's information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user's information
 *       401:
 *         description: Unauthorized - Invalid token
 */
usersRouter.get('/myInfo', async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Token not provided" });
    }
    
    try {
        const id_users = (AuthenticationService.decodeToken(token) as AccessTokenDecoded).id_users;
        getMyInfo(id_users, res);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
});
