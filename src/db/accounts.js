import users from './users';

class Accounts {
  constructor() {
    this.accounts = [];
  }

  bankAccountList() {
    this.testBankAccountOne = {
      id: 1111111111,
      accountNumber: 1212121212,
      createdOn: new Date(),
      owner: users.testUserOne.id,
      type: 'Savings',
      status: 'Active',
      balance: 11000.00,
    };

    this.testBankAccountTwo = {
      id: 3333333333,
      accountNumber: 1313131313,
      createdOn: new Date(),
      owner: users.testUserOne.id,
      type: 'Current',
      status: 'Active',
      balance: 12000.00,
    };

    this.testBankAccountThree = {
      id: 444444444444,
      accountNumber: 1414141414,
      createdOn: new Date(),
      owner: users.testUserOne.id,
      type: 'Current',
      status: 'dormant',
      balance: 12000.00,
    };

    this.testBankAccountList = [this.testBankAccountOne,
      this.testBankAccountTwo, this.testBankAccountThree];
    this.accounts.push(...this.testBankAccountList);
  }
}

const accounts = new Accounts();
accounts.bankAccountList();

export default accounts;
