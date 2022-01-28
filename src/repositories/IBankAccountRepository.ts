import BankAccount from "../models/BankAccount";

interface ICreateBankAccountDTO {
    id?: string | number;
    account_number: string;
    agency_number: string;
    account_balance: number;
    account_owner_id: string;
}

interface IBankAccountRepository {
    findByAccountNumberAndAgencyNumber(account_number: string, agency_number: string): Promise<BankAccount>;
    list(): Promise<BankAccount[]>;
    create({ id, account_number, agency_number, account_balance, account_owner_id }: ICreateBankAccountDTO): Promise<BankAccount>;
}

export { IBankAccountRepository, ICreateBankAccountDTO }