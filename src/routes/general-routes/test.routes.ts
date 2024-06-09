import express, { Request, Response } from "express";
import { testMyAPISocket } from "../../controllers/general-controllers/test-controllers/testMyAPISocket.controller";
import { testMyAPI } from "../../controllers/general-controllers/test-controllers/testMyAPI.controller";

export const testRouter = express.Router();

testRouter.get('/socket', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPISocket(res);
});

testRouter.get('/:test', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPI(test, res);
});