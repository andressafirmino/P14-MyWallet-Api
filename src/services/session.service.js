import { findOperationsByEmail } from "../repositories/session.repository.js";

export async function getOperations(email) {
    return await findOperationsByEmail(email);
}