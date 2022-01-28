import { getRepository } from "typeorm";
import BankAccount from "../../models/BankAccount";
import { IBankAccountRepository, ICreateBankAccountDTO } from "../IBankAccountRepository";

class InMemoryBankAccountRepository implements IBankAccountRepository {
    bankAccounts: BankAccount[] = [];

    async create({ id, account_number, agency_number, account_balance, account_owner_id }: ICreateBankAccountDTO): Promise<BankAccount> {
        const bankAccountAllReadyExist = await this.findByAccountNumberAndAgencyNumber(account_number, agency_number)
        if (bankAccountAllReadyExist) {
            console.error('Conta Bancária já existe!');
            return bankAccountAllReadyExist;
        }

        const bankAccount = new BankAccount();
        Object.assign(bankAccount, { id, account_number, agency_number, account_balance, account_owner_id });
        this.bankAccounts.push(bankAccount)
        
        return bankAccount;
    }

    async list(): Promise<BankAccount[]> {
        return this.bankAccounts;
    }

    async findByAccountNumberAndAgencyNumber(account_number: string, agency_number: string): Promise<BankAccount | any> {
        const bankAccount = this.bankAccounts.find((bankAccount) => bankAccount.account_number === account_number && bankAccount.agency_number === agency_number);
        
        return bankAccount;
    }

    async update({ id, account_number, agency_number, account_balance }: ICreateBankAccountDTO): Promise<BankAccount | any> {
        
    }
}

export { InMemoryBankAccountRepository }