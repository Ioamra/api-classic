import express, { Request, Response } from "express";
import { getAllUsers } from "../../controllers/admin-controllers/users-admin-controllers/getAllUsers.controller";

export const adminRouter = express.Router();

/**
 * @swagger
 * /admin/users/getAll:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Returns all users
 */
adminRouter.get('/users/getAll', async (req: Request, res: Response) => {
    getAllUsers(res);
});