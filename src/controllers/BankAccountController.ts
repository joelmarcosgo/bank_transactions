import { Request, Response } from 'express';
import { container } from "tsyringe";
import { getRepository } from 'typeorm';
import BankAccount from '../models/BankAccount';
import CreateBankAccountService from '../services/CreateBankAccountService';
import ValidDataJsonApi from '../validations/ValidDataJsonApi';
import { BankAccountRepository } from '../repositories/BankAccountRepository';

export default class BankAccountController {

    public async index(request: Request, response: Response): Promise<Response> {
        const bankAccountRepository = new BankAccountRepository();

        const allBankAccounts = await bankAccountRepository.list()

        return response.json({
            results: allBankAccounts
        });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { account_owner_id, account_number, agency_number, account_balance } = request.body;
        const createBankAccountService = container.resolve(CreateBankAccountService);

        const validData = new ValidDataJsonApi();
        const isValidBody = await validData.isValidBankAccount({
            account_number,
            agency_number,
            account_balance,
            account_owner_id
        })

        if (isValidBody.length > 0) {
            return response.json(isValidBody);
        }

        const bankAccountCreated = await createBankAccountService.execute({ 
            account_number,
            agency_number,
            account_balance,
            account_owner_id 
        });

        return response.json(bankAccountCreated);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { account_number, agency_number, account_balance } = request.body;

        const validData = new ValidDataJsonApi();
        const isValidBody = await validData.isValidBankAccountToUpdate({
            account_number,
            agency_number,
            account_balance
        })

        if (isValidBody.length > 0) {
            return response.json(isValidBody);
        }

        const bankAccountRepository = getRepository(BankAccount);

        const bankAccountUpdate = await bankAccountRepository.findOne(id);

        if (!bankAccountUpdate) {
            return response.json({ message: "Conta bancária não encontrada!" }).status(404);
        }

        if (account_number) bankAccountUpdate.account_number = account_number;
        if (agency_number) bankAccountUpdate.agency_number = agency_number;
        if (account_balance) bankAccountUpdate.account_balance = account_balance;
        await bankAccountRepository.save(bankAccountUpdate)

        return response.json({
            conta: bankAccountUpdate
        });
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const bankAccountRepository = getRepository(BankAccount);

        const bankAccount = await bankAccountRepository.findOne(id);

        if (!bankAccount) {
            return response.json({ message: "Conta bancária não encontrada!" }).status(404);
        }

        await bankAccountRepository.delete(bankAccount);

        return response.status(200).send();
    }
}
