import { db } from "../database/database.connection.js";

export async function getUserByEmail(email) {
    return await db.collection("users").findOne({ email: email });
}

export async function createUser(name, email, password) {
    return await db.collection("users").insertOne({
        name,
        email,
        password
    })
}

export async function createSession(token, idUser) {
    return await db.collection("session").insertOne({
        token,
        idUser
    })
}

export async function deleteUser(token) {
    return await db.collection("session").deleteOne({ token });
}

export async function getSession() {
    return await db.collection("session").find().toArray();
}