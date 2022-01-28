import { inject, injectable } from "tsyringe";
import { getRepository } from 'typeorm';
import Transaction from "../models/Transaction";
import { BankAccountRepository } from "../repositories/BankAccountRepository";
import { ITransactionRepository } from "../repositories/ITransactionRepository";

interface IRequest {
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

@injectable()
class CreateTransactionService {
    constructor(
        @inject("TransactionRepository")
        private transactionRepository: ITransactionRepository
    ) {}

    public async execute({
        id,
        account_number,
        agency_number,
        transaction_type,
        description,
        transaction_category,
        amount,
        to_account_number,
        to_agency_number
    }: IRequest): Promise<Transaction | any> {
        const bankAccountRepository = new BankAccountRepository()
        const bankAccount = await bankAccountRepository.findByAccountNumberAndAgencyNumber(account_number, agency_number);

        if(!bankAccount) {
            return { error: "Conta bancária não localizada!" }
        }

        if (transaction_type === "deposit") {
            const newTransactionCreated = await this.transactionRepository.deposit({
                id,
                account_number,
                agency_number,
                transaction_type,
                description,
                transaction_category,
                amount
            })

            return newTransactionCreated;  
        }

        if (transaction_type === "withdraw") {
            const newTransactionCreated = await this.transactionRepository.withdraw({
                id,
                account_number,
                agency_number,
                transaction_type,
                description,
                transaction_category,
                amount
            })

            return newTransactionCreated;  
        }

        if (transaction_type === "transfer") {
            const newTransactionCreated = await this.transactionRepository.transfer({
                id,
                account_number,
                agency_number,
                transaction_type,
                description,
                transaction_category,
                amount,
                to_account_number,
                to_agency_number
            })

            return newTransactionCreated;  
        }

    }
}

export default CreateTransactionService;
