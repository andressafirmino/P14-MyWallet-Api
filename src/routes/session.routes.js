import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { newTransaction, renderOperation } from "../controllers/session.controller.js";
import { validateSchema, validateSchemaHeader } from "../middlewares/validateSchema.js";
import { bodySchema, newTransactionSchema, typeSchema } from "../schemas/session.schema.js";


const sessionsRouter = Router();

sessionsRouter.get("/home", validateSchema(bodySchema), renderOperation);
sessionsRouter.post("/nova-transacao/:type", validateSchemaHeader(typeSchema), validateSchema(newTransactionSchema), newTransaction);

export default sessionsRouter;