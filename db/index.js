class Banka {
  constructor() {
    this.users = [];
    this.bankAccounts = [];
    this.transactions = [];
    this.admins = [];
    this.staff = [];
  }

  userData(data) {
    this.userReqData = {
      id: Math.floor(Math.random() * 1000000000),
      email: String(data.userEmail),
      firstName: String(data.userFirstName),
      lastName: String(data.userLastName),
      password: String(data.userPassword),
      type: String(data.accountType),
      isAdmin: false,
    };
    return this.userReqData;
  }

  createUserDataResponse(data) {
    this.userResData = {
      id: parseInt(data.userId, 10),
      firstName: String(data.userFirstName),
      lastName: String(data.userLastName),
      email: String(data.userEmail),
    };
    return this.userResData;
  }

  bankAccount(data) {
    this.bankAccountData = {
      id: Math.floor(Math.random() * 1000000000),
      accountNumber: Math.floor(100000000 + Math.random() * 900000000),
      createdOn: new Date(),
      owner: parseInt(data.ownerId, 10),
      type: String(data.bankAccountType),
      status: String(data.bankAccountStatus),
      balance: parseFloat(data.bankAccountBalance),
    };
    return this.bankAccountData;
  }

  createBankAccountResponse(dataOne, dataTwo) {
    this.newBankAccountRes = {
      accountNumber: parseInt(dataOne.userId, 10),
      firstName: String(dataTwo.userFirstName),
      lastName: String(dataTwo.userLastName),
      email: String(dataTwo.userEmail),
      type: String(dataOne.bankAccountType),
      openingBalance: parseFloat(dataOne.bankAccountBalance),
    };
    return this.newBankAccountRes;
  }

  transaction(data) {
    this.transactionData = {
      id: Math.floor(Math.random() * 1000000000),
      createdOn: new Date(),
      type: String(data.transactionType),
      accountNumber: parseInt(data.accountNumber, 10),
      cashier: parseInt(data.cashierId, 10),
      amount: parseFloat(data.transactionAmount),
      oldBalance: parseFloat(data.accountBalance),
      newBalance: parseFloat(data.accountBalance) - parseFloat(data.transactionAmount),
    };
    return this.transactionData;
  }

  processTransaction(data) {
    this.transactionResData = {
      transactionId: parseInt(data.transactionId, 10),
      accountNumber: String(data.accountNumber),
      amount: parseFloat(data.transactionAmount),
      cashier: parseInt(data.cashierId, 10),
      transactionType: String(data.transactionType),
      accountBalance: String(data.accountBalance - data.transactionAmount),
    };
    return this.transactionResData;
  }

  adminStaffData(data) {
    this.adminStaff = {
      id: Math.floor(Math.random() * 1000000000),
      username: String(data.username),
      password: String(data.password),
      isAdmin: true,
    };
    return this.adminStaff;
  }

  staffData(data) {
    this.staffInfo = {
      id: Math.floor(Math.random() * 1000000000),
      username: String(data.username),
      password: String(data.password),
      type: String(data.accountType),
      isAdmin: false,
    };
    return this.staffInfo;
  }

  UserList() {
    this.testUserOne = {
      id: 1010101010,
      email: 'foobar@com',
      firstName: 'Foo',
      lastName: 'Bar',
      password: 'Abcderg13#isfg',
      type: 'Client',
    };

    this.testUserTwo = {
      id: 2020202020,
      email: 'barfoo@com',
      firstName: 'Bar',
      lastName: 'Foo',
      password: 'Abcderg13#isfg',
      type: 'Client',
    };

    this.userDataList = [this.testUserOne, this.testUserTwo];
    this.users.push(...this.userDataList);
  }

  bankAccountList() {
    this.testBankAccountOne = {
      id: 1111111111,
      accountNumber: 1212121212,
      createdOn: new Date(),
      owner: this.testUserOne.id,
      type: 'Savings',
      status: 'Active',
      balance: 1000000,
    };

    this.testBankAccountTwo = {
      id: 3333333333,
      accountNumber: 1313131313,
      createdOn: new Date(),
      owner: this.testUserOne.id,
      type: 'Current',
      status: 'Active',
      balance: 1000000,
    };

    this.testBankAccountList = [this.testBankAccountOne, this.testBankAccountTwo];
    this.bankAccounts.push(...this.testBankAccountList);
  }

  staffList() {
    this.testStaffOne = {
      id: 3030303030,
      username: 'FooBar',
      password: '12345ABC#',
      type: 'staff',
      isAdmin: false,
    };

    this.testStaffTwo = {
      id: 4040404040,
      username: 'BarFoo',
      password: '12345ABC#',
      type: 'staff',
      isAdmin: false,
    };
    this.testStaffList = [this.testStaffOne, this.testStaffTwo];
    this.staff.push(...this.testStaffList);
  }

  adminList() {
    this.testAdminOne = {
      id: 5050505050,
      username: 'FooBar',
      password: '12345ABC#',
      isAdmin: true,
    };

    this.testAdminTwo = {
      id: 6060606060,
      username: 'BarFoo',
      password: '12345ABC#',
      isAdmin: true,
    };

    this.testAdminList = [this.testAdminOne, this.testAdminTwo];
    this.admins.push(...this.testAdminList);
  }

  transactionList() {
    this.testTransactionOne = {
      id: 7777777777,
      createdOn: new Date(),
      type: 'Credit',
      accountNumber: this.testBankAccountOne.accountNumber,
      cashier: this.testStaffOne.id,
      amount: 1000,
      oldBalance: 11000,
      newBalance: 10000,
    };

    this.testTransactionTwo = {
      id: 8888888888,
      createdOn: new Date(),
      type: 'Credit',
      accountNumber: this.testBankAccountTwo.accountNumber,
      cashier: this.testStaffTwo.id,
      amount: 2000,
      oldBalance: 12000,
      newBalance: 10000,
    };

    this.testTransactionList = [this.testTransactionOne, this.testTransactionTwo];
    this.transactions.push(...this.testTransactionList);
  }
}

const banka = new Banka();

banka.UserList();
banka.bankAccountList();
banka.staffList();
banka.adminList();
banka.transactionList();

export default banka;
