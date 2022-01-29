import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
  
@Entity('account_owners')
class AccountOwner {

    @PrimaryColumn()
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

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default AccountOwner




