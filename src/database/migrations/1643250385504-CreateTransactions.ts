import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1643250385504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'bank_account_id',
                        type: 'int',
                    },
                    {
                        name: 'transaction_type',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'transaction_category',
                        type: 'varchar',
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        precision: 20,
                        scale: 2
                    },
                    {
                        name: 'previous_balance',
                        type: 'decimal',
                        precision: 20,
                        scale: 2
                    },
                    {
                        name: 'current_balance',
                        type: 'decimal',
                        precision: 20,
                        scale: 2
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
        await queryRunner.dropTable('transactions');
    }

}
