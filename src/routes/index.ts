import { Router } from 'express';
import cors from 'cors';
import { accountOwnerRoutes } from './accountOwner.routes';
import { bankAccountRoutes } from './bankAccount.routes';
import { transactionsRoutes } from './transactions.routes';

const routes = Router();
routes.use(cors());

routes.use("/api/account", bankAccountRoutes)
routes.use("/api/owner", accountOwnerRoutes)
routes.use("/api/transactions", transactionsRoutes)

export default routes;
