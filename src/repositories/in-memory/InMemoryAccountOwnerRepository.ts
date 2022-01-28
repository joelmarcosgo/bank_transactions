import { getRepository } from "typeorm";
import AccountOwner from "../../models/AccountOwner";
import { IAccountOwnerRepository, ICreateAccountOwnerDTO } from "../IAccountOwnerRepository";

class InMemoryAccountOwnerRepository implements IAccountOwnerRepository {
    accountOwners: AccountOwner[] = [];

    async create({ id, name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone }: ICreateAccountOwnerDTO): Promise<AccountOwner> {
        const accountOwnerAllReadyExist = await this.findAccountOwnerByCpf(cpf)
        if (accountOwnerAllReadyExist) {
            console.error('Representante já cadastrado no sistema!');
            return accountOwnerAllReadyExist;
        }

        const accountOwner = new AccountOwner();
        Object.assign(accountOwner, { id, name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone });
        this.accountOwners.push(accountOwner)
        
        return accountOwner;
    }

    async list(): Promise<AccountOwner[]> {
        return this.accountOwners;
    }

    async findAccountOwnerByCpf(cpf: string): Promise<AccountOwner | any> {
        const accountOwner = this.accountOwners.find((accountOwner) => accountOwner.cpf === cpf);
        
        return accountOwner;
    }
}

export { InMemoryAccountOwnerRepository }