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
      id: Math.floor(Math.random() * 1000000000000000),
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
      id: Math.floor(Math.random() * 1000000000000000),
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000),
      createdOn: new Date(),
      owner: parseInt(data.ownerId, 10),
      type: String(data.bankAccountType),
      status: String(data.bankAccountStatus),
      balance: parseFloat(data.bankAccountBalance),
    };
    return this.bankAccountData;
  }

  createBankAccountResponse(data) {
    this.newBankAccountData = {
      accountNumber: parseInt(data.userId, 10),
      firstName: String(data.userFirstName),
      lastName: String(data.userLastName),
      email: String(data.userEmail),
      type: String(data.bankAccountType),
      openingBalance: parseFloat(data.bankAccountBalance),
    };
    return this.newBankAccountData;
  }

  transaction(data) {
    this.transactionData = {
      id: Math.floor(Math.random() * 1000000000000000),
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
      id: Math.floor(Math.random() * 1000000000000000),
      username: String(data.username),
      password: String(data.password),
      isAdmin: true,
    };
    return this.adminStaff;
  }

  staffData(data) {
    this.staffInfo = {
      id: Math.floor(Math.random() * 1000000000000000),
      username: String(data.username),
      password: String(data.password),
      type: String(data.accountType),
      isAdmin: false,
    };
    return this.staffInfo;
  }

  UserList() {
    this.testUserOne = {
      userEmail: 'foobar@com',
      userFirstName: 'Foo',
      userLastName: 'Bar',
      userPassword: 'Abcderg13#isfg',
      accountType: 'Client',
    };

    this.testUserTwo = {
      userEmail: 'barfoo@com',
      userFirstName: 'Bar',
      userLastName: 'Foo',
      userPassword: 'Abcderg13#isfg',
      accountType: 'Client',
    };

    this.testUserOneData = this.userData(this.testUserOne);
    this.testUserTwoData = this.userData(this.testUserTwo);
    this.userDataList = [this.testUserOneData, this.testUserTwoData];
    this.users.push(...this.userDataList);
  }

  bankAccountList() {
    this.testBankAccountOneData = {
      ownerId: this.testUserOneData.id,
      bankAccountType: 'Savings',
      bankAccountStatus: 'Active',
      bankAccountBalance: '1000000',
    };

    this.testBankAccountTwoData = {
      ownerId: this.testUserTwoData.id,
      bankAccountType: 'Current',
      bankAccountStatus: 'Active',
      bankAccountBalance: '150000',
    };

    this.testBankAccountOne = this.bankAccount(this.testBankAccountOneData);
    this.testBankAccountTwo = this.bankAccount(this.testBankAccountTwoData);
    this.testBankAccountList = [this.testBankAccountOne, this.testBankAccountTwo];
    this.bankAccounts.push(...this.testBankAccountList);
  }

  staffList() {
    this.testStaffOneData = {
      username: 'FooBar',
      password: '12345ABC#',
      accountType: 'staff',
    };

    this.testStaffTwoData = {
      username: 'BarFoo',
      password: '12345ABC#',
      accountType: 'staff',
    };

    this.testStaffOne = this.staffData(this.testStaffOneData);
    this.testStaffTwo = this.staffData(this.testStaffTwoData);
    this.testStaffList = [this.testStaffOne, this.testStaffTwo];
    this.staff.push(...this.testStaffList);
  }

  adminList() {
    this.testAdminOneData = {
      username: 'FooBar',
      password: '12345ABC#',
    };

    this.testAdminTwoData = {
      username: 'BarFoo',
      password: '12345ABC#',
    };

    this.testAdminOne = this.adminStaffData(this.testAdminOneData);
    this.testAdminTwo = this.adminStaffData(this.testAdminTwoData);
    this.testAdminList = [this.testAdminOne, this.testAdminTwo];
    this.admins.push(...this.testAdminList);
  }

  transactionList() {
    this.testTransactionOneData = {
      transactionType: 'Credit',
      accountNumber: this.testBankAccountOne.accountNumber,
      cashierId: this.testStaffOne.id,
      transactionAmount: '10000',
      accountBalance: this.testBankAccountOne.balance,
    };

    this.testTransactionTwoData = {
      transactionType: 'Debit',
      accountNumber: this.testBankAccountTwo.accountNumber,
      cashierId: this.testStaffTwo.id,
      transactionAmount: '14000',
      accountBalance: this.testBankAccountTwo.balance,
    };

    this.testTransactionOne = this.transaction(this.testTransactionOneData);
    this.testTransactionTwo = this.transaction(this.testTransactionTwoData);
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
