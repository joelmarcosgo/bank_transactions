import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBankAccount1643152762157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'bank_accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'account_number',
                        type: 'varchar',
                    },
                    {
                        name: 'agency_number',
                        type: 'varchar',
                    },
                    {
                        name: 'account_balance',
                        type: 'decimal',
                        precision: 20,
                        scale: 2
                    },
                    {
                        name: 'account_owner_id',
                        type: 'varchar',
                    },
                    {
                        name: 'opening_date',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bank_accounts');
    }

}
