import { db } from "../database/database.connection.js";


export async function renderOperation (req, res) {
    const {user} = req.body;
    try {
        const operations = await db.collection("operations").find({email: user}).toArray();
        res.send({operations: operations});
    } catch (e) {
        res.status(500).send(e.message);
    }
}

