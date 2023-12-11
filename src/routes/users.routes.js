import { Router } from "express";
import { home, logout, signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";

const usersRouter = Router();

usersRouter.post("/cadastro", validateSchema(signUpSchema), signUp);
usersRouter.post("/", validateSchema(signInSchema), signIn);
usersRouter.delete("/home", logout);
usersRouter.get("/", home);

export default usersRouter;