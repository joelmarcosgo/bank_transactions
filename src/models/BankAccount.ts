import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import AccountOwner from './AccountOwner';
  
@Entity('bank_accounts')
class BankAccount {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    account_number: string;

    @Column()
    agency_number: string;

    @Column({ name: 'account_balance', precision: 20, scale: 2 })
    account_balance: number;

    @Column()
    opening_date: Date;

    @Column({ nullable: false })
    account_owner_id: string;

    @ManyToOne(type => AccountOwner, owner => owner.id)
    @JoinColumn({ name: 'account_owner_id' })
    account_owner: AccountOwner;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default BankAccount
