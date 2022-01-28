import { Request, Response } from 'express';
import { container } from "tsyringe";
import { getRepository } from 'typeorm';
import AccountOwner from '../models/AccountOwner';
import BankAccount from '../models/BankAccount';
import { AccountOwnerRepository } from '../repositories/AccountOwnerRepository';
import CreateAccountOwnerService from '../services/CreateAccountOwnerService';
import ValidDataJsonApi from '../validations/ValidDataJsonApi';

export default class AccountOwnerController {

    public async index(request: Request, response: Response): Promise<Response> {
        const accountOwnerRepository = new AccountOwnerRepository();

        const allAccountOwners = await accountOwnerRepository.list();
      
        return response.json({
            results: allAccountOwners
        });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone } = request.body;
        const createAccountOwnerService = container.resolve(CreateAccountOwnerService);

        const isValidDataJson = new ValidDataJsonApi()
        const isValidBody = await isValidDataJson.isValidAccountOwner({name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone})

        if (isValidBody.lenght > 0) {
            return response.json({ error: isValidBody })
        }

        const accountOwnerCreated = await createAccountOwnerService.execute({ 
            name,
            cpf,
            email,
            birth_date,
            address,
            address_number,
            complement,
            neighborhood,
            zipcode,
            city,
            state,
            phone
        });

        return response.json(accountOwnerCreated);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { 
            name,
            cpf,
            email,
            birth_date,
            address,
            address_number,
            complement,
            neighborhood,
            zipcode,
            city,
            state,
            phone
         } = request.body;

        const isValidDataJson = new ValidDataJsonApi()
        const isValidBody = await isValidDataJson.isValidAccountOwnerToUpdate({name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone})

        if (isValidBody.lenght > 0) {
            return response.json({ error: isValidBody })
        }

        const accountOwnerRepository = getRepository(AccountOwner);

        const accountOwnerUpdate = await accountOwnerRepository.findOne(id);

        if (!accountOwnerUpdate) {
            return response.json({ message: "Representante não encontrada!" }).status(404);
        }

        if (name) accountOwnerUpdate.name = name;
        if (cpf) accountOwnerUpdate.cpf = cpf;
        if (email) accountOwnerUpdate.email = email;
        if (birth_date) accountOwnerUpdate.birth_date = new Date(birth_date);
        if (address) accountOwnerUpdate.address = address;
        if (address_number) accountOwnerUpdate.address_number = address_number;
        if (complement) accountOwnerUpdate.complement = complement;
        if (neighborhood) accountOwnerUpdate.neighborhood = neighborhood;
        if (zipcode) accountOwnerUpdate.zipcode = zipcode;
        if (city) accountOwnerUpdate.city = city;
        if (state) accountOwnerUpdate.state = state;
        if (phone) accountOwnerUpdate.phone = phone;
        
        await accountOwnerRepository.save(accountOwnerUpdate)

        return response.json({
            representante: accountOwnerUpdate
        });
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const bankAccountRepository = getRepository(BankAccount);
        const accountOwnerRepository = getRepository(AccountOwner);

        const checkBankAccountExist = await bankAccountRepository.findOne(id);

        if (checkBankAccountExist) {
            return response.json({ message: "Representante não pode ser excluído, pois possui conta bancária vinculada!" }).status(400);
        }

        const accountOwner = await accountOwnerRepository.findOne(id);

        if (!accountOwner) {
            return response.json({ message: "Representante não encontrado!" }).status(404);
        }

        await accountOwnerRepository.delete(accountOwner);

        return response.status(200).send();
    }
}
