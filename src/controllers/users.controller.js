import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";


export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email: email });
        if (user) {
            return res.status(409).send({ message: "Usuário já cadastrado!" });
        }
        const hash = bcrypt.hashSync(password, 10);
        await db.collection("users").insertOne({
            name,
            email,
            password: hash
        })
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Usuario não cadastrado!" });
        }
        const compare = bcrypt.compareSync(password, user.password);
        if (!compare) {
            return res.status(401).send({ message: "Senha incorreta!" });
        }
        const token = uuid();
        await db.collection("session").insertOne({
            token,
            idUser: user._id
        })
        res.status(200).send({ token: token, name: user.name, email: user.email });
    } catch (e) {
        res.status(500).send(e.message);
    }
}
