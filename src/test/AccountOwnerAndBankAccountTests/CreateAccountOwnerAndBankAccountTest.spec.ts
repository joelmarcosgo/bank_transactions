import request from "supertest"
import { Connection } from "typeorm";
import { server } from "../../appServer"

import createConnection from '../../database'

let connection: Connection;

describe("Criar Representante Da Conta", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new account owner and new bank account!", async () => {
        const response = await request(server).post("/api/owner")
        .send({
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
        });

        const responseBankAccountOne = await request(server).post("/api/account")
        .send({
            account_owner_id: response.body.id,
            account_number: "12345678903", 
            agency_number: "0001",
            account_balance: 1234.59
        });

        const responseBankAccountSecond = await request(server).post("/api/account")
        .send({
            account_owner_id: response.body.id,
            account_number: "12345678904", 
            agency_number: "0001",
            account_balance: 1234.59
        });

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")

        expect(responseBankAccountOne.status).toBe(200)
        expect(responseBankAccountOne.body).toHaveProperty("id")

        expect(responseBankAccountSecond.status).toBe(200)
        expect(responseBankAccountSecond.body).toHaveProperty("id")
    })
})