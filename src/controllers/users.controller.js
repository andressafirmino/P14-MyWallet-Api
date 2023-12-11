import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";
import { SignUp } from "../services/users.service.js";


export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        await SignUp(name, email, password)
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
console.log(email, password)
    try {
        /*  const user = await db.collection("users").findOne({ email });
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
         }) */
        const user = await signIn(email, password);
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const deleteUser = await db.collection("session").deleteOne({ token });
        res.send(deleteUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function home(req, res) {

    try {
        const users = await db.collection("session").find().toArray();
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
}