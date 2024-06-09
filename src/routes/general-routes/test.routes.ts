import express, { Request, Response } from "express";
import { testMyAPI } from "../../controllers/general-controllers/test-controllers/testMyAPI.controller";

export const testRouter = express.Router();

testRouter.get('/:test', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPI(test, res);
});