import { inject, injectable } from "tsyringe";
import { getRepository, getManager } from 'typeorm';
import BankAccount from '../models/BankAccount';
import { IBankAccountRepository } from '../repositories/IBankAccountRepository';

interface IValidJsonBankAccount {
    account_number: string;
    agency_number: string;
    account_balance: number;
    account_owner_id?: string;
}

interface IValidJsonAccountOwner {
    name: string;
    cpf: string;
    email: string;
    birth_date: string;
    address: string;
    address_number: string;
    complement: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    state: string;
    phone: string;
}

interface IValidJsonTransaction {
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
class ValidDataJsonApi {
    public async isValidBankAccount({
        account_number,
        agency_number,
        account_balance,
        account_owner_id
    }: IValidJsonBankAccount): Promise<any> {
        let validDataJson: any = [];
        if(!account_owner_id || account_owner_id === null || account_owner_id === undefined || typeof account_owner_id !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "account_owner_id é obrigatório!",
                type: "string"
            })
        }
        if(!account_number || account_number === null || account_number === undefined || typeof account_number !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "account_number é obrigatório!",
                type: "string"
            })
        }
        if(!agency_number || agency_number === null || agency_number === undefined || typeof agency_number !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "agency_number é obrigatório!",
                type: "string"
            })
        }
        if(!account_balance || account_balance === null || account_balance === undefined || typeof account_balance !== "number") {
            validDataJson.push({
                error: "Campo Obrigatório e decimal",
                message: "account_balance é obrigatório e decimal!",
                type: "decimal"
            })
        }

        return validDataJson
    }

    public async isValidAccountOwner({
        name, cpf, email, birth_date,
        address, address_number, complement,
        neighborhood, zipcode, city, state, phone
    }: IValidJsonAccountOwner): Promise<any> {
        let validDataJson: any = [];
        if(!name || name === null || name === undefined || typeof name !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "name é obrigatório!",
                type: "string"
            })
        }
        if(!cpf || cpf === null || cpf === undefined || typeof cpf !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "cpf é obrigatório!",
                type: "string"
            })
        }
        if(!email || email === null || email === undefined || typeof email !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "email é obrigatório!",
                type: "string"
            })
        }
        if(!birth_date || birth_date === null || birth_date === undefined || birth_date === "") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "birth_date é obrigatório e o formato é: 1999-12-01 (yyyy-mm-dd)!",
                type: "string"
            })
        }
        if(!address || address === null || address === undefined || typeof address !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "address é obrigatório!",
                type: "string"
            })
        }
        if(!address_number || address_number === null || address_number === undefined || typeof address_number !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "address_number é obrigatório!",
                type: "string"
            })
        }
        if(!neighborhood || neighborhood === null || neighborhood === undefined || typeof neighborhood !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "neighborhood é obrigatório!",
                type: "string"
            })
        }
        if(!zipcode || zipcode === null || zipcode === undefined || typeof zipcode !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "neighborhood é obrigatório!",
                type: "string"
            })
        }

        if(!city || city === null || city === undefined || typeof city !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "neighborhood é obrigatório!",
                type: "string"
            })
        }
        if(!state || state === null || state === undefined || typeof state !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "neighborhood é obrigatório!",
                type: "string"
            })
        }
        if(!phone || phone === null || phone === undefined || typeof phone !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "phone é obrigatório!",
                type: "string"
            })
        }

        return validDataJson
    }

    public async isValidAccountOwnerToUpdate({
        name, cpf, email, birth_date,
        address, address_number, complement,
        neighborhood, zipcode, city, state, phone
    }: IValidJsonAccountOwner): Promise<any> {
        let validDataJson: any = [];
        if(name && typeof name !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "name deve ser string!",
                type: "string"
            })
        }
        if(cpf && typeof cpf !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "cpf deve ser string!",
                type: "string"
            })
        }
        if(email && typeof email !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "email deve ser string!",
                type: "string"
            })
        }
        if(birth_date && typeof birth_date !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "birth_date deve ser string e o formato é: 1999-12-01 (yyyy-mm-dd)!",
                type: "string"
            })
        }
        if(address && typeof address !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "address deve ser string!",
                type: "string"
            })
        }
        if(address_number && typeof address_number !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "address_number deve ser string!",
                type: "string"
            })
        }
        if(neighborhood && typeof neighborhood !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "neighborhood deve ser string!",
                type: "string"
            })
        }
        if(zipcode && typeof zipcode !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "zipcode deve ser string!",
                type: "string"
            })
        }

        if(city && typeof city !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "city deve ser string!",
                type: "string"
            })
        }
        if(state && typeof state !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "state deve ser string!",
                type: "string"
            })
        }
        if(phone && typeof phone !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "phone deve ser string!",
                type: "string"
            })
        }

        return validDataJson
    }

    public async isValidBankAccountToUpdate({
        account_number,
        agency_number,
        account_balance
    }: IValidJsonBankAccount): Promise<any> {
        let validDataJson: any = [];
        if(account_number && typeof account_number !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "account_number deve ser string!",
                type: "string"
            })
        }
        if(agency_number && typeof agency_number !== "string") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "agency_number deve ser string!",
                type: "string"
            })
        }
        if(account_balance && typeof account_balance !== "number") {
            validDataJson.push({
                error: "Tipo Campo Incorreto",
                message: "account_balance deve ser string!",
                type: "string"
            })
        }

        return validDataJson
    }

    public async isValidTransactionToCreate({ 
        account_number,
        agency_number,
        transaction_type,
        description,
        transaction_category,
        amount,
        to_account_number,
        to_agency_number
    }: IValidJsonTransaction): Promise<any> {
        let validDataJson: any = [];

        if(to_account_number && typeof to_account_number !== "string") {
            validDataJson.push({
                error: "Campo do tipo String",
                message: "to_account_number é obrigatório!",
                type: "string"
            })
        }
        if(to_agency_number && typeof to_agency_number !== "string") {
            validDataJson.push({
                error: "Campo do tipo String",
                message: "to_agency_number é obrigatório!",
                type: "string"
            })
        }

        if(!account_number || account_number === null || account_number === undefined || typeof account_number !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "account_number é obrigatório!",
                type: "string"
            })
        }
        if(!agency_number || agency_number === null || agency_number === undefined || typeof agency_number !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "agency_number é obrigatório!",
                type: "string"
            })
        }
        if(!transaction_type || transaction_type === null || transaction_type === undefined || typeof transaction_type !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "transaction_type é obrigatório!",
                type: "string"
            })
        }
        if(!description || description === null || description === undefined || typeof description !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "agency_number é obrigatório!",
                type: "string"
            })
        }
        if(!transaction_category || transaction_category === null || transaction_category === undefined || typeof transaction_category !== "string") {
            validDataJson.push({
                error: "Campo Obrigatório",
                message: "agency_number é obrigatório!",
                type: "string"
            })
        }
        if(!amount || amount === null || amount === undefined || typeof amount !== "number") {
            validDataJson.push({
                error: "Campo Obrigatório e decimal",
                message: "amount é obrigatório e decimal!",
                type: "decimal"
            })
        }

        return validDataJson
    }
}

export default ValidDataJsonApi;
