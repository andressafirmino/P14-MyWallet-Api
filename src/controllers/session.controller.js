import { db } from "../database/database.connection.js";


export async function renderOperation(req, res) {
    const { user } = req.body;
    try {
        const operations = await db.collection("operations").find({ email: user }).toArray();
        //console.log(operations);
        res.send({ operations: operations });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function newTransaction(req, res) {
    const { value, description, email } = req.body;
    const { type } = req.params;
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dateNow = `${day}/${month}`;

    try {
        await db.collection("operations").insertOne({ value, description, type, dateNow, email });
        res.send("OK");
    } catch (e) {
        res.status(500).send(e.message);
    }
}

