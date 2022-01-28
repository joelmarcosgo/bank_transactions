import { Router } from "express";
import BankAccountController from "../controllers/BankAccountController";

const bankAccountRoutes = Router();
const bankAccountController = new BankAccountController()

bankAccountRoutes.get("/", bankAccountController.index);

bankAccountRoutes.post("/", bankAccountController.create);

bankAccountRoutes.put("/:id", bankAccountController.update);

bankAccountRoutes.delete("/:id", bankAccountController.delete);

export { bankAccountRoutes };