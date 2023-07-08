import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { renderOperation } from "../controllers/session.controller.js";


const sessionsRouter = Router();

sessionsRouter.get("/home", renderOperation);

export default sessionsRouter;