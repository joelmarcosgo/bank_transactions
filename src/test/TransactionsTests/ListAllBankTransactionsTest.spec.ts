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
        const response = await request(server).get("/api/transactions");

        console.log(response.body)

        expect(response.status).toBe(200)
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
      });
})