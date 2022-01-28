import { Request, Response } from 'express';
import { container } from "tsyringe";
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import { AccountOwnerRepository } from '../repositories/AccountOwnerRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ValidDataJsonApi from '../validations/ValidDataJsonApi';

export default class TransactionsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const transactionRepository = getRepository(Transaction)

        const allTransactions = await transactionRepository.createQueryBuilder('transactions')
            .select('transactions.*, account.account_number as bank_account_number, account.agency_number as bank_agency_number, owner.name as owner_name, owner.cpf as owner_cpf')
            .innerJoin('bank_accounts', 'account', 'transactions.bank_account_id = account.id')
            .innerJoin('account_owners', 'owner', 'account.account_owner_id = owner.id')
            .getRawMany();
      
        return response.json({
            results: allTransactions
        });
    }

    public async transactions(request: Request, response: Response): Promise<Response> {
        const { account_number, agency_number, transaction_type, description, transaction_category, amount, to_account_number, to_agency_number } = request.body;
        const createTransactionService = container.resolve(CreateTransactionService);

        const isValidDataJson = new ValidDataJsonApi()
        const isValidBody = await isValidDataJson.isValidTransactionToCreate({account_number, agency_number, transaction_type, description, transaction_category, amount, to_account_number, to_agency_number})

        if (isValidBody.lenght > 0) {
            return response.json({ error: isValidBody })
        }

        const transactionCreated = await createTransactionService.execute({ 
            account_number,
            agency_number,
            transaction_type,
            description,
            transaction_category,
            amount,
            to_account_number,
            to_agency_number
        });

        return response.json(transactionCreated);
    }

}
