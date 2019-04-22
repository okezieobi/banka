import accounts from './accounts';
import users from './users';

class Transactions {
  constructor() {
    this.transactions = [];
  }

  transactionList() {
    this.testTransactionOne = {
      id: 7777777777,
      createdOn: new Date(),
      type: 'Credit',
      accountNumber: accounts.testBankAccountOne.accountNumber,
      cashier: users.testStaffOne.id,
      amount: 1000.00,
      oldBalance: 11000.00,
      newBalance: 10000.00,
    };

    this.testTransactionTwo = {
      id: 8888888888,
      createdOn: new Date(),
      type: 'Credit',
      accountNumber: accounts.testBankAccountTwo.accountNumber,
      cashier: users.testStaffTwo.id,
      amount: 2000.00,
      oldBalance: 12000.00,
      newBalance: 10000.00,
    };

    this.testTransactionList = [this.testTransactionOne, this.testTransactionTwo];
    this.transactions.push(...this.testTransactionList);
  }
}

const transactions = new Transactions();
transactions.transactionList();

export default transactions;
