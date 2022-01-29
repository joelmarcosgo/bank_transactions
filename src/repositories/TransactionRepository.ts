import { getRepository, Repository } from "typeorm";
import { ITransactionRepository, ICreateTransactionDTO } from "./ITransactionRepository";
import Transaction from "../models/Transaction";
import BankAccount from "../models/BankAccount";

class TransactionRepository implements ITransactionRepository {
    private bankAccountRepository: Repository<BankAccount>;
    private transactionRepository: Repository<Transaction>;

    constructor() {
        this.bankAccountRepository = getRepository(BankAccount);
        this.transactionRepository = getRepository(Transaction);
    }

    async deposit({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any> {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) return false

        let currentBalance = Number(bankAccount.account_balance) + Number(amount);

        const newTransaction = this.transactionRepository.create({
            bank_account_id: bankAccount.id,
            transaction_type,
            description,
            transaction_category,
            amount,
            previous_balance: bankAccount.account_balance,
            current_balance: currentBalance
        });
        const transactionCreated = await this.transactionRepository.save(newTransaction)

        bankAccount.account_balance = currentBalance;
        await this.bankAccountRepository.save(bankAccount)

        return transactionCreated;
    }

    async withdraw({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any> {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) return false

        let currentBalance = Number(bankAccount.account_balance) - Number(amount)

        const newTransaction = this.transactionRepository.create({
            bank_account_id: bankAccount.id,
            transaction_type,
            description,
            transaction_category,
            amount: amount,
            previous_balance: bankAccount.account_balance,
            current_balance: currentBalance,
        });
        const transactionCreated = await this.transactionRepository.save(newTransaction)

        bankAccount.account_balance = currentBalance;
        await this.bankAccountRepository.save(bankAccount)

        return transactionCreated;
    }

    async transfer({ id, account_number, agency_number, transaction_type, description, transaction_category, amount, to_account_number, to_agency_number }: ICreateTransactionDTO): Promise<Transaction | any> {
        const fromBankAccount = await this.bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });
        if (!fromBankAccount) return false

        const toBankAccount = await this.bankAccountRepository.findOne({
            where: { account_number: to_account_number, agency_number: to_agency_number }
        });
        if (!toBankAccount) return false
        
        let fromCurrentBalance = Number(fromBankAccount.account_balance) - Number(amount)
        let toCurrentBalance = Number(toBankAccount.account_balance) + Number(amount)

        const newTransferFromBank = this.transactionRepository.create({
            bank_account_id: fromBankAccount.id,
            transaction_type: `${transaction_type}_from`,
            description: `Transferência de C/C: ${fromBankAccount.account_number} Ag: ${fromBankAccount.agency_number} - ${description}`,
            transaction_category,
            amount,
            previous_balance: fromBankAccount.account_balance,
            current_balance: fromCurrentBalance,
        });
        const transferFromBankAccountCreated = await this.transactionRepository.save(newTransferFromBank)

        const newTransferToBank = this.transactionRepository.create({
            bank_account_id: toBankAccount.id,
            transaction_type: `${transaction_type}_to`,
            description: `Transferência para C/C: ${toBankAccount.account_number} Ag: ${toBankAccount.agency_number} - ${description}`,
            transaction_category,
            amount,
            previous_balance: toBankAccount.account_balance,
            current_balance: toCurrentBalance,
        });
        const transferToBankAccountCreated = await this.transactionRepository.save(newTransferToBank)

        fromBankAccount.account_balance = fromCurrentBalance;
        await this.bankAccountRepository.save(fromBankAccount)

        toBankAccount.account_balance = toCurrentBalance;
        await this.bankAccountRepository.save(toBankAccount)

        return { 
            transfer: {
                from: transferFromBankAccountCreated,
                to: transferToBankAccountCreated
            }
        };
    }

}

export { TransactionRepository }