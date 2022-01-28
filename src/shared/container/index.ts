import { container } from "tsyringe";
import { AccountOwnerRepository } from "../../repositories/AccountOwnerRepository";
import { BankAccountRepository } from "../../repositories/BankAccountRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";

container.registerSingleton<BankAccountRepository>(
  "BankAccountRepository",
  BankAccountRepository
);

container.registerSingleton<AccountOwnerRepository>(
  "AccountOwnerRepository",
  AccountOwnerRepository
);

container.registerSingleton<TransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);