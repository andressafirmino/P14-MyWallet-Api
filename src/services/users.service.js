import { conflictError } from "../errors/conflict.js";
import { notFoundError } from "../errors/notFound.js";
import { unauthorizedError } from "../errors/unauthorized.error.js";
import { createSession, createUser, deleteUser, getSession, getUserByEmail } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function SignUp(name, email, password) {
    const user = await getUserByEmail(email);
    if (user) throw conflictError("Usuário");
    const hash = bcrypt.hashSync(password, 10);

    return await createUser(name, email, hash);
}

export async function SignIn(email, password) {
    const user = await getUserByEmail(email);
    if (!user) throw notFoundError("Usuário");

    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) throw unauthorizedError("Usuário");

    const token = uuid();
    await createSession(token, user._id);

    return { token, name: user.name, email: user.email }
}

export async function deleteUserByToken(token) {
    return await deleteUser(token);
}

export async function getUsers() {
    return await getSession();
}