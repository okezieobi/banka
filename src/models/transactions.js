export default class Transactions {
  static debitAccountTransaction(dataOne, dataTwo, dataThree) {
    const transactionData = {
      id: Math.floor(Math.random() * 1000000000),
      createdOn: new Date(),
      type: 'Debit',
      accountNumber: parseInt(dataTwo.account_number, 10),
      cashier: parseInt(dataThree['cashier-id'], 10),
      amount: parseFloat(dataOne.transactionAmount),
      oldBalance: parseFloat(dataTwo.accountBalance),
      newBalance: parseFloat((parseFloat(dataTwo.accountBalance)
        - parseFloat(dataOne.transactionAmount)).toFixed(2)),
    };
    return transactionData;
  }

  static creditAccountTransaction(dataOne, dataTwo, dataThree) {
    const transactionData = {
      id: Math.floor(Math.random() * 1000000000),
      createdOn: new Date(),
      type: 'Credit',
      accountNumber: parseInt(dataTwo.account_number, 10),
      cashier: parseInt(dataThree['cashier-id'], 10),
      amount: parseFloat(dataOne.transactionAmount),
      oldBalance: parseFloat(dataTwo.accountBalance),
      newBalance: parseFloat((parseFloat(dataTwo.accountBalance)
        + parseFloat(dataOne.transactionAmount)).toFixed(2)),
    };
    return transactionData;
  }

  static transactionResponse(data) {
    const transactionResData = {
      transactionId: parseInt(data.id, 10),
      accountNumber: String(data.accountNumber),
      amount: parseFloat(data.amount),
      cashier: parseInt(data.cashier, 10),
      transactionType: String(data.type),
      accountBalance: String(data.newBalance),
    };
    return transactionResData;
  }
}
