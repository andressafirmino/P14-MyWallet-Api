import { Router } from "express";
import usersRouter from "./users.routes.js";
import sessionsRouter from "./session.routes.js";

const router = Router();

router.use(usersRouter);
router.use(sessionsRouter);

export default router;