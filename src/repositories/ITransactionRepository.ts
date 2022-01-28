import Transaction from "../models/Transaction";

interface ICreateTransactionDTO {
    id?: string;
    account_number: string;
    agency_number: string;
    transaction_type: string;
    description: string;
    transaction_category: string;
    amount: number;
    to_account_number?: string;
    to_agency_number?: string;
}

interface ITransactionRepository {
    deposit({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any>;
    withdraw({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any>;
    transfer({ id, account_number, agency_number, transaction_type, description, transaction_category, amount, to_account_number, to_agency_number }: ICreateTransactionDTO): Promise<Transaction | any>;
}

export { ITransactionRepository, ICreateTransactionDTO }