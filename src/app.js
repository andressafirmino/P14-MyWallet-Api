import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import joi from "joi";

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
} catch(e) {
    console.log(e.message);
}
const db = mongoClient.db();

//endpoint
app.post("/cadastro", async(req, res) => {
    const {name, email, password} = req.body;
    const signUpSchema = joi.object({
        name: joi.string().min(1).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    const validateSignUp = signUpSchema.validate(req.body, { abortEarly: false });
    if(validateSignUp.error) {
        const errors = validateSignUp.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }
    try {
        const user = await db.collection("users").findOne({ email: email });
        if (user) {
            return res.sendStatus(409);
        }
        await db.collection("users").insertOne({
            name,
            email,
            password
        })
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }

})


const PORT = 5000;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));