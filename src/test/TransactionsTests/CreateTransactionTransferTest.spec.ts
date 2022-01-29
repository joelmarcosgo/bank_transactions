import request from "supertest"
import { Connection } from "typeorm";
import { server } from "../../appServer"

import createConnection from '../../database'

let connection: Connection;

describe("Criar Transação Bancária de Transferência", () => {

    beforeAll(async () => {
        connection = await createConnection();
    })

    it("Should be able to create a new bank transfer!", async () => {
        const response = await request(server).post("/api/transactions")
        .send({
            "account_number": "12345678903",
            "agency_number": "0001",
            "transaction_type": "transfer",
            "description": "Transferência",
            "transaction_category": "Pagamentos",
            "amount": 125.56,
            "to_account_number": "12345678904",
            "to_agency_number": "0001"
        });

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("transfer")
    })
})