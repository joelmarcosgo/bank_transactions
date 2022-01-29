import request from "supertest"
import { Connection } from "typeorm";
import { server } from "../../appServer"

import createConnection from '../../database'

let connection: Connection;

describe("Criar Transação Bancária de Depósito", () => {

    beforeAll(async () => {
        connection = await createConnection();
    })

    it("Should be able to create a new bank deposit!", async () => {
        const response = await request(server).post("/api/transactions")
        .send({
            "account_number": "12345678904",
            "agency_number": "0001",
            "transaction_type": "withdraw",
            "description": "Faculdade",
            "transaction_category": "Educação",
            "amount": 230.56
        });

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
    })

    afterAll(async () => {
        await connection.close();
    });
})