import AccountOwner from "../models/AccountOwner";

interface ICreateAccountOwnerDTO {
    id?: string | number;
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

interface IAccountOwnerRepository {
    findAccountOwnerByCpf(cpf: string): Promise<AccountOwner>;
    list(): Promise<AccountOwner[]>;
    create({ id, name, cpf, email, birth_date, address, address_number, complement, neighborhood, zipcode, city, state, phone }: ICreateAccountOwnerDTO): Promise<AccountOwner>;
}

export { IAccountOwnerRepository, ICreateAccountOwnerDTO }