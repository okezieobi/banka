export default class Accounts {
  static bankAccount(data) {
    const bankAccountData = {
      id: Math.floor(Math.random() * 1000000000),
      accountNumber: Math.floor(100000000 + Math.random() * 900000000),
      createdOn: new Date(),
      owner: parseInt(data['owner-id'], 10),
      type: String(data.bankAccountType),
      status: 'Active',
      balance: 0.00,
    };
    return bankAccountData;
  }

  static createBankAccountResponse(dataOne, dataTwo) {
    const newBankAccountRes = {
      accountNumber: parseInt(dataOne.accountNumber, 10),
      firstName: String(dataTwo.firstName),
      lastName: String(dataTwo.lastName),
      email: String(dataTwo.email),
      type: String(dataOne.type),
      openingBalance: parseFloat(dataOne.balance),
    };
    return newBankAccountRes;
  }

  static updateAccountStatus(data) {
    const updateStatus = {
      accountNumber: data.accountNumber,
      status: data.status,
    };
    return updateStatus;
  }
}
