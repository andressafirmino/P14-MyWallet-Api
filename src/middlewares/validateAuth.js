import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next) {

    const { authrization } = req.headers;
    const token = authrization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("session").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        next();

    } catch (e) {
        res.status(500).send(e.message);
    }
}