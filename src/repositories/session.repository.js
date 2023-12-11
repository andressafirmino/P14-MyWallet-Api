import { db } from "../database/database.connection.js";

export async function findOperationsByEmail(email) {
    return await db.collection("operations").find({ email }).toArray();
}
