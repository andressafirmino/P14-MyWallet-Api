import { Router } from "express";
import { home, logout, signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.post("/cadastro", validateSchema(signUpSchema), signUp);
usersRouter.post("/", validateSchema(signInSchema), signIn);
usersRouter.delete("/home", validateAuth, logout);
usersRouter.get("/", home);
export default usersRouter;