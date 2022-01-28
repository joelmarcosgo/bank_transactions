import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
  
@Entity('account_owners')
class AccountOwner {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    birth_date: Date;

    @Column()
    address: string;

    @Column()
    address_number: string;

    @Column()
    complement: string;

    @Column()
    neighborhood: string;

    @Column()
    zipcode: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default AccountOwner




