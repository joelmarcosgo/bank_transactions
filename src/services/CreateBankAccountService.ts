import { inject, injectable } from "tsyringe";
import { getRepository, getManager } from 'typeorm';
import BankAccount from '../models/BankAccount';
import { IBankAccountRepository } from '../repositories/IBankAccountRepository';

interface IRequest {
    id?: string | number;
    account_number: string;
    agency_number: string;
    account_balance: number;
    account_owner_id: string;
}

@injectable()
class CreateBankAccountService {
    constructor(
        @inject("BankAccountRepository")
        private bankAccountRepository: IBankAccountRepository
    ) {}

    public async execute({
        id,
        account_number,
        agency_number,
        account_balance,
        account_owner_id
    }: IRequest): Promise<BankAccount> {
        const bankAccountAllReadyExists = await this.bankAccountRepository.findByAccountNumberAndAgencyNumber(account_number, agency_number)

        if(bankAccountAllReadyExists) {
            return bankAccountAllReadyExists
        }

        const newBankAccountCreated = await this.bankAccountRepository.create({
            id,
            account_number,
            agency_number,
            account_balance,
            account_owner_id
        })

        return newBankAccountCreated;
    }
}

export default CreateBankAccountService;
