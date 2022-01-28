import { getRepository } from "typeorm";
import { IAccountOwnerRepository, ICreateAccountOwnerDTO } from './IAccountOwnerRepository';
import AccountOwner from "../models/AccountOwner";

class AccountOwnerRepository implements IAccountOwnerRepository {
    constructor() {}

    async create({ name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone }: ICreateAccountOwnerDTO): Promise<AccountOwner> {
        const accountOwnerRepository = getRepository(AccountOwner);

        const checkAccountOwnerExists = await accountOwnerRepository.findOne({
            where: { cpf }
        });

        if (checkAccountOwnerExists) {
            console.error('Representante já existe no sistema!');
            return checkAccountOwnerExists;
        }

        const newAccountOwner = new AccountOwner();
        newAccountOwner.name = name;
        newAccountOwner.cpf = cpf;
        newAccountOwner.email = email;
        newAccountOwner.birth_date = new Date(birth_date);
        newAccountOwner.address = address;
        newAccountOwner.address_number = address_number;
        newAccountOwner.complement = complement;
        newAccountOwner.neighborhood = neighborhood;
        newAccountOwner.zipcode = zipcode;
        newAccountOwner.city = city;
        newAccountOwner.state = state;
        newAccountOwner.phone = phone;
        const accountOwner = await accountOwnerRepository.save(newAccountOwner);

        return accountOwner;
    }

    async list(): Promise<AccountOwner[]> {
        const accountOwnerRepository = getRepository(AccountOwner);

        const allAccountOwners = await accountOwnerRepository.find({
            order: { created_at: 'DESC' }
        });

        return allAccountOwners;
    }

    async findAccountOwnerByCpf(cpf: string): Promise<AccountOwner | any> {
        const accountOwnerRepository = getRepository(AccountOwner);
        const accountOwner = await accountOwnerRepository.findOne({
            where: { cpf }
        });

        if (!accountOwner) {
            return false
        }

        return accountOwner
    }
}

export { AccountOwnerRepository }