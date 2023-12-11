import { createNewTransaction, findOperationsByEmail } from "../repositories/session.repository.js";

export async function getOperations(email) {
    return await findOperationsByEmail(email);
}

export async function NewTransaction(value, description, type, email) {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dateNow = `${day}/${month}`;

    return await createNewTransaction(value, description, type, dateNow, email);
}