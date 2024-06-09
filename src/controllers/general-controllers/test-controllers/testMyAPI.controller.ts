import { Response } from "express";
import { pool } from "../../../config/db.config";

export const testMyAPI = async (test: string, res: Response) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        
        await client.query('COMMIT');
        res.status(200).send({
            message: 'Working test ' + test,
        });
    }catch(e){
        await client.query('ROLLBACK');
        res.status(400).send({
            message: 'Error test :' + e,
        });
    }finally{
        client.release(true);
    }
};