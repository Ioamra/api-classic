import express, { Request, Response } from "express";
import { testMyAPI } from "../../controllers/general-controllers/test-controllers/testMyAPI.controller";

export const testRouter = express.Router();

/**
 * @swagger
 * /test/{test}:
 *   get:
 *     summary: Test API endpoint
 *     tags:
 *       - Testing
 *     parameters:
 *       - in: path
 *         name: test
 *         required: true
 *         schema:
 *           type: string
 *         description: Test parameter
 *     responses:
 *       200:
 *         description: Returns test result
 */
testRouter.get('/:test', async (req: Request, res: Response) => {
    const test = req.params.test;
    testMyAPI(test, res);
});
