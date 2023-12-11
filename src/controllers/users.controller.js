import { SignIn, SignUp, deleteUserByToken, getUsers } from "../services/users.service.js";


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
    try {
        const user = await SignIn(email, password);
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const user = await deleteUserByToken(token);
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function home(req, res) {

    try {
        const users = await getUsers();
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
}