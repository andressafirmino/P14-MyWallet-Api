import { db } from "../database/database.connection.js";


export async function renderOperation(req, res) {
    const { user } = req.body;
    try {
        const operations = await db.collection("operations").find({ email: user }).toArray();
        res.send({ operations: operations });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function newTransaction(req, res) {
    const { value, description } = req.body;
    const { type } = req.params;

    try {
        await db.collection("operations").insertOne({ value, description, type });
        res.send("OK");
    } catch (e) {
        res.status(500).send(e.message);
    }
}

