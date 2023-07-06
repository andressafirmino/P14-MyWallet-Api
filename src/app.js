import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import joi from "joi";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
// configurações
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//conexão com servidor
const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    mongoClient.connect();
    console.log("MongoDB conectado");
} catch (e) {
    console.log(e.message);
}
const db = mongoClient.db();

//endpoint
app.post("/cadastro", async (req, res) => {
    const { name, email, password } = req.body;
    const signUpSchema = joi.object({
        name: joi.string().min(1).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    const validateSignUp = signUpSchema.validate(req.body, { abortEarly: false });
    if (validateSignUp.error) {
        const errors = validateSignUp.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }
    try {
        const user = await db.collection("users").findOne({ email: email });
        if (user) {
            return res.sendStatus(409);
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
})

app.post("/", async(req, res) => {
    const {email, password} = req.body;
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    const validateSignIn = signInSchema.validate(req.body, {abortEarly: false});
    if (validateSignIn.error) {
        const errors = validateSignIn.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("users").findOne({email});
        if(!user) {
            return res.sendStatus(404);
        }
        const compare = bcrypt.compareSync(password, user.password);
        if(!compare) {
            return res.sendStatus(401);
        }
        const token = uuid();
        await db.collection("session").insertOne({
            token, 
            idUser: user._id
        })
        res.status(200).send(token);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.get("loggedUser", async(req, res) => {
    const {authrization} = req.headers;
    const token = authrization?.replace("Bearer ", "");

    if(!token) {
        return res.sendStatus(401);
    }
    try {
        const session = await db.collection("session").findOne({token});
        if(!session) {
            return res.sendStatus(401);
        }
        const user = await db.collection("users").findOne({_id: session.idUser});
        delete user.password;
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));