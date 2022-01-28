import { getRepository } from "typeorm";
import { ITransactionRepository, ICreateTransactionDTO } from "./ITransactionRepository";
import Transaction from "../models/Transaction";
import BankAccount from "../models/BankAccount";

class TransactionRepository implements ITransactionRepository {
    constructor() {}

    async deposit({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any> {
        const bankAccountRepository = getRepository(BankAccount);
        const transactionRepository = getRepository(Transaction);
        const bankAccount = await bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) return false

        let currentBalance = Number(bankAccount.account_balance) + Number(amount);

        const newTransaction = new Transaction();
        newTransaction.bank_account_id = bankAccount.id;
        newTransaction.transaction_type = transaction_type;
        newTransaction.description = description;
        newTransaction.transaction_category = transaction_category;
        newTransaction.amount = amount;
        newTransaction.previous_balance = bankAccount.account_balance;
        newTransaction.current_balance = currentBalance;
        const transactionCreated = await transactionRepository.save(newTransaction)

        bankAccount.account_balance = currentBalance;
        await bankAccountRepository.save(bankAccount)

        return transactionCreated;
    }

    async withdraw({ id, account_number, agency_number, transaction_type, description, transaction_category, amount }: ICreateTransactionDTO): Promise<Transaction | any> {
        const bankAccountRepository = getRepository(BankAccount);
        const transactionRepository = getRepository(Transaction);
        const bankAccount = await bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!bankAccount) return false

        let currentBalance = Number(bankAccount.account_balance) - Number(amount)

        const newTransaction = new Transaction();
        newTransaction.bank_account_id = bankAccount.id;
        newTransaction.transaction_type = transaction_type;
        newTransaction.description = description;
        newTransaction.transaction_category = transaction_category;
        newTransaction.amount = amount;
        newTransaction.previous_balance = bankAccount.account_balance;
        newTransaction.current_balance = currentBalance;
        const transactionCreated = await transactionRepository.save(newTransaction)

        bankAccount.account_balance = currentBalance;
        await bankAccountRepository.save(bankAccount)

        return transactionCreated;
    }

    async transfer({ id, account_number, agency_number, transaction_type, description, transaction_category, amount, to_account_number, to_agency_number }: ICreateTransactionDTO): Promise<Transaction | any> {
        const bankAccountRepository = getRepository(BankAccount);
        const transactionRepository = getRepository(Transaction);
        const fromBankAccount = await bankAccountRepository.findOne({
            where: { account_number, agency_number }
        });

        if (!fromBankAccount) return false

        const toBankAccount = await bankAccountRepository.findOne({
            where: { account_number: to_account_number, agency_number: to_agency_number }
        });

        if (!toBankAccount) return false
        
        let fromCurrentBalance = Number(fromBankAccount.account_balance) - Number(amount)
        let toCurrentBalance = Number(toBankAccount.account_balance) + Number(amount)

        const newTransferFromBank = new Transaction();
        newTransferFromBank.bank_account_id = fromBankAccount.id;
        newTransferFromBank.transaction_type = `${transaction_type}_from`;
        newTransferFromBank.description = `Transferência de C/C: ${fromBankAccount.account_number} Ag: ${fromBankAccount.agency_number} - ${description}`;
        newTransferFromBank.transaction_category = transaction_category;
        newTransferFromBank.amount = amount;
        newTransferFromBank.previous_balance = fromBankAccount.account_balance;
        newTransferFromBank.current_balance = fromCurrentBalance;
        const transferFromBankAccountCreated = await transactionRepository.save(newTransferFromBank)

        const newTransferToBank = new Transaction();
        newTransferToBank.bank_account_id = toBankAccount.id;
        newTransferToBank.transaction_type = `${transaction_type}_to`;
        newTransferToBank.description = `Transferência para C/C: ${toBankAccount.account_number} Ag: ${toBankAccount.agency_number} - ${description}`;
        newTransferToBank.transaction_category = transaction_category;
        newTransferToBank.amount = amount;
        newTransferToBank.previous_balance = toBankAccount.account_balance;
        newTransferToBank.current_balance = toCurrentBalance;
        const transferToBankAccountCreated = await transactionRepository.save(newTransferToBank)

        fromBankAccount.account_balance = fromCurrentBalance;
        await bankAccountRepository.save(fromBankAccount)

        toBankAccount.account_balance = toCurrentBalance;
        await bankAccountRepository.save(toBankAccount)

        return { 
            transfer: {
                from: transferFromBankAccountCreated,
                to: transferToBankAccountCreated
            }
        };
    }

}

export { TransactionRepository }