import { getRepository, Repository } from "typeorm";
import BankAccount from "../models/BankAccount";
import { IBankAccountRepository, ICreateBankAccountDTO } from "./IBankAccountRepository";

class BankAccountRepository implements IBankAccountRepository {
    private bankAccountRepository: Repository<BankAccount>;

    constructor() {
        this.bankAccountRepository = getRepository(BankAccount);
    }

    async create({ account_number, agency_number, account_balance, account_owner_id }: ICreateBankAccountDTO): Promise<BankAccount> {
        const checkBankAccountExists = await this.bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (checkBankAccountExists) {
            console.error('Conta Bancária já existe!');
            return checkBankAccountExists;
        }

        const newBankAccount = this.bankAccountRepository.create({
            account_number,
            agency_number,
            account_balance,
            account_owner_id
        });
        const bankAccountCreated = await this.bankAccountRepository.save(newBankAccount);

        return bankAccountCreated;
    }

    async list(): Promise<BankAccount[]> {
        const allBankAccounts = await this.bankAccountRepository.createQueryBuilder('bank_accounts')
            .select('bank_accounts.*, owner.name as owner_name, owner.cpf as owner_cpf')
            .innerJoin('account_owners', 'owner', 'bank_accounts.account_owner_id = owner.id')
            .getRawMany();

        return allBankAccounts;
    }

    async findByAccountNumberAndAgencyNumber(account_number: string, agency_number: string): Promise<BankAccount | any> {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) {
            return false
        }

        return bankAccount
    }
}

export { BankAccountRepository }