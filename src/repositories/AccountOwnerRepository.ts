import { getRepository, Repository } from "typeorm";
import { IAccountOwnerRepository, ICreateAccountOwnerDTO } from './IAccountOwnerRepository';
import AccountOwner from "../models/AccountOwner";

class AccountOwnerRepository implements IAccountOwnerRepository {
    private accountOwnerepository: Repository<AccountOwner>;
    
    constructor() {
        this.accountOwnerepository = getRepository(AccountOwner)
    }

    async create({ name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone }: ICreateAccountOwnerDTO): Promise<AccountOwner> {
        const checkAccountOwnerExists = await this.accountOwnerepository.findOne({
            where: { cpf }
        });

        if (checkAccountOwnerExists) {
            console.error('Representante já existe no sistema!');
            return checkAccountOwnerExists;
        }

        const newAccountOwner = this.accountOwnerepository.create({
            name,
            cpf,
            email,
            birth_date: new Date(birth_date),
            address,
            address_number,
            complement,
            neighborhood,
            zipcode,
            city,
            state,
            phone,
        })
        const accountOwner = await this.accountOwnerepository.save(newAccountOwner);

        return accountOwner;
    }

    async list(): Promise<AccountOwner[]> {
        const allAccountOwners = await this.accountOwnerepository.find({
            order: { created_at: 'DESC' }
        });

        return allAccountOwners;
    }

    async findAccountOwnerByCpf(cpf: string): Promise<AccountOwner | any> {
        const accountOwner = await this.accountOwnerepository.findOne({
            where: { cpf }
        });

        if (!accountOwner) {
            return false
        }

        return accountOwner
    }
}

export { AccountOwnerRepository }