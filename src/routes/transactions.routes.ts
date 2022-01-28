import { Router } from "express";
import TransactionsController from "../controllers/TransactionsController";

const transactionsRoutes = Router();
const transactionsController = new TransactionsController()

transactionsRoutes.get("/", transactionsController.index);

transactionsRoutes.post("/", transactionsController.transactions);

export { transactionsRoutes };