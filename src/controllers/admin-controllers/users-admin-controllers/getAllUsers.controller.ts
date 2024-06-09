import { Response } from "express";
import { pool } from "../../../config/db.config";

export const getAllUsers = async (res: Response) => {
    const client = await pool.connect();
    try{
        const { rows } = await client.query('SELECT * FROM users;');
        res.status(200).send({
            message: 'success',
            data: rows
        });
    }catch(e){
        res.status(400).send({
            message: 'Error getAllUsers :' + e,
        });
    }finally{
        client.release(true);
    }
};