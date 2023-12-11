import { NewTransaction, getOperations } from "../services/session.service.js";


export async function renderOperation(req, res) {
    const { email } = req.query;
    try {
        const operations = await getOperations(email);
        res.send({ operations: operations });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function newTransaction(req, res) {
    const { value, description, email } = req.body;
    const { type } = req.params;

    try {
        await NewTransaction(value, description, email, type)
        res.send("OK");
    } catch (e) {
        res.status(500).send(e.message);
    }
}



