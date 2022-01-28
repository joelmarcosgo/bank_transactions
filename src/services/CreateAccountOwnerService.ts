import { inject, injectable } from "tsyringe";
import { getRepository } from 'typeorm';
import AccountOwner from '../models/AccountOwner';
import { IAccountOwnerRepository } from "../repositories/IAccountOwnerRepository";

interface IRequest {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    birth_date: Date;
    address: string;
    address_number: string;
    complement: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    state: string;
    phone: string;
}

@injectable()
class CreateAccountOwnerService {
    constructor(
        @inject("AccountOwnerRepository")
        private accountOwnerRepository: IAccountOwnerRepository
    ) {}

    public async execute({
        id,
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
    }: IRequest): Promise<AccountOwner> {
        const accountOwnerAllReadyExists = await this.accountOwnerRepository.findAccountOwnerByCpf(cpf)

        if(accountOwnerAllReadyExists) {
            return accountOwnerAllReadyExists
        }

        const newAccountOwnerCreated = await this.accountOwnerRepository.create({
            id,
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
        })

        return newAccountOwnerCreated;      
    }
}

export default CreateAccountOwnerService;
