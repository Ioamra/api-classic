import express, { Request, Response } from "express";
import { getAllUsers } from "../../controllers/admin-controllers/users-admin-controllers/getAllUsers.controller";

export const adminRouter = express.Router();

adminRouter.get('/users/getAll', async (req: Request, res: Response) => {
    getAllUsers(res);
});