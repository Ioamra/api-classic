import { Response } from "express";
import { pool } from "../../../config/db.config";
import { getSocketIO } from "../../../config/socket.config";

export const testMyAPISocket = async (res: Response) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const io = getSocketIO();

        // Emission d'un événement
        console.log("Emitting 'someEvent'...");
        io.emit("someEvent", { data: "some data" });
        console.log("Event 'someEvent' emitted successfully.");

        await client.query('COMMIT');
        res.status(200).send({
            message: 'Working test aaaaa',
        });
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("Error emitting 'someEvent':", e);
        res.status(400).send({
            message: 'Error test :' + e,
        });
    } finally {
        client.release(true);
    }
};
