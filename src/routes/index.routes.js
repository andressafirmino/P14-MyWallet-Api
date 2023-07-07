import { Router } from "express";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(usersRouter);
//router.use(sessionRouter);

export default router;