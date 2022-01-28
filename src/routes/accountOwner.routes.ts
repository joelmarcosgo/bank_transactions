import { Router } from "express";
import AccountOwnerController from "../controllers/AccountOwnerController";

const accountOwnerRoutes = Router();
const accountOwnerController = new AccountOwnerController()

accountOwnerRoutes.get("/", accountOwnerController.index);

accountOwnerRoutes.post("/", accountOwnerController.create);

accountOwnerRoutes.put("/:id", accountOwnerController.update);

accountOwnerRoutes.delete("/:id", accountOwnerController.delete);

export { accountOwnerRoutes };