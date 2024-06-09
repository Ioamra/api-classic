import express, { Request, Response } from "express";
import { testMyAPI } from '../../controllers/test-controllers/test.controller'
import { testMyAPISocket } from "../../controllers/test-controllers/test-socket.controller";

export const testRouter = express.Router();

testRouter.get('/socket', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPISocket(res);
});

testRouter.get('/:test', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPI(test, res);
});