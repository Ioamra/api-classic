import express, { Request, Response } from "express";
import { testMyAPI } from '../../controllers/test-controllers/test.controller'
export const testRouter = express.Router();


testRouter.get('/:test', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPI(test, res);
});