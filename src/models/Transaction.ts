import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import BankAccount from './BankAccount';
  
@Entity('transactions')
class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    bank_account_id: number;

    @Column()
    transaction_type: string;

    @Column()
    description: string;

    @Column()
    transaction_category: string;

    @Column({ name: 'amount', precision: 20, scale: 2 })
    amount: number;

    @Column({ name: 'previous_balance', precision: 20, scale: 2 })
    previous_balance: number;

    @Column({ name: 'current_balance', precision: 20, scale: 2 })
    current_balance: number;
    
    @ManyToOne(type => BankAccount, bankAccount => bankAccount.id)
    @JoinColumn({ name: 'bank_account_id' })
    bank_account: BankAccount;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export default Transaction
