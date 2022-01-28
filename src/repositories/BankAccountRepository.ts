import { getRepository } from "typeorm";
import BankAccount from "../models/BankAccount";
import { IBankAccountRepository, ICreateBankAccountDTO } from "./IBankAccountRepository";

class BankAccountRepository implements IBankAccountRepository {
    constructor() {}

    async create({ account_number, agency_number, account_balance, account_owner_id }: ICreateBankAccountDTO): Promise<BankAccount> {
        const bankAccountRepository = getRepository(BankAccount);

        const checkBankAccountExists = await bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (checkBankAccountExists) {
            console.error('Conta Bancária já existe!');
            return checkBankAccountExists;
        }

        const newBankAccount = new BankAccount();
        newBankAccount.account_number = account_number;
        newBankAccount.agency_number = agency_number;
        newBankAccount.account_balance = account_balance;
        newBankAccount.account_owner_id = account_owner_id;
        await bankAccountRepository.save(newBankAccount);

        return newBankAccount;
    }

    async list(): Promise<BankAccount[]> {
        const bankAccountRepository = getRepository(BankAccount);

        const allBankAccounts = await bankAccountRepository.find({
            order: { created_at: 'DESC' }
        });

        return allBankAccounts;
    }

    async findByAccountNumberAndAgencyNumber(account_number: string, agency_number: string): Promise<BankAccount | any> {
        const bankAccountRepository = getRepository(BankAccount);
        const bankAccount = await bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) {
            return false
        }

        return bankAccount
    }
}

export { BankAccountRepository }