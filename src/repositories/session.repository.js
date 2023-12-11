import { db } from "../database/database.connection.js";

export async function findOperationsByEmail(email) {
    return await db.collection("operations").find({ email: email }).toArray();
}

export async function createNewTransaction(value, description, type, dateNow, email) {
    return await db.collection("operations").insertOne({ value, description, type, dateNow, email });
}
