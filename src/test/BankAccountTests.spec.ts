import { InMemoryBankAccountRepository } from "../repositories/in-memory/InMemoryBankAccountRepository";
import CreateBankAccountService from "../services/CreateBankAccountService";
import { v4 as uuidV4 } from "uuid";
import CreateAccountOwnerService from "../services/CreateAccountOwnerService";
import { InMemoryAccountOwnerRepository } from "../repositories/in-memory/InMemoryAccountOwnerRepository";

let createBankAccount: CreateBankAccountService
let inMemoryBankAccountRepository: InMemoryBankAccountRepository

let createAccountOwner: CreateAccountOwnerService
let inMemoryAccountOwnerRepository: InMemoryAccountOwnerRepository

describe("Criar Conta Bancária e Representante da Conta", () => {

    beforeEach(() => {
        inMemoryAccountOwnerRepository = new InMemoryAccountOwnerRepository();
        createAccountOwner = new CreateAccountOwnerService(inMemoryAccountOwnerRepository);

        inMemoryBankAccountRepository = new InMemoryBankAccountRepository();
        createBankAccount = new CreateBankAccountService(inMemoryBankAccountRepository);
    })
    
    it("Deve ser possível cadastrar um novo representante e uma nova conta bancária", async () => {
        const owner = {
            id: uuidV4(),
            name: "User Test",
            cpf: "12345678999",
            email: "teste@email.com",
            birth_date: "1999-09-19",
            address: "Rua Test",
            address_number: "1234",
            complement: "",
            neighborhood: "Bairro Test",
            zipcode: "12.345-678",
            city: "City Test",
            state: "State Test",
            phone: "99999999999"
        }

        const accountOwner = await createAccountOwner.execute({
            id: owner.id,
            name: owner.name,
            cpf: owner.cpf,
            email: owner.email,
            birth_date: new Date(owner.birth_date),
            address: owner.address,
            address_number: owner.address_number,
            complement: owner.complement,
            neighborhood: owner.neighborhood,
            zipcode: owner.zipcode,
            city: owner.city,
            state: owner.state,
            phone: owner.phone
        })

        const accountOwnerCreated = await inMemoryAccountOwnerRepository.findAccountOwnerByCpf(owner.cpf)
        console.log({ accountOwnerCreated })
        
        const data = {
            id: uuidV4(),
            account_number: "12345678939",
            agency_number: "0001",
            account_balance: 1234.56
        }

        const bankAccount = await createBankAccount.execute({
            id: data.id,
            account_number: data.account_number,
            agency_number: data.agency_number,
            account_balance: data.account_balance,
            account_owner_id: accountOwnerCreated.id
        })

        const bankAccountCreated = await inMemoryBankAccountRepository.findByAccountNumberAndAgencyNumber(data.account_number, data.agency_number)
        console.log({ bankAccountCreated })

        expect(bankAccountCreated).toHaveProperty("id")
    })
})