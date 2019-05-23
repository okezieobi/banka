import numbers from '../helpers/unique_no';

export default class Transactions {
  static transactions(amount, bankInfo, cashierId, type, newBalance) {
    const transactionData = {
      transactionId: numbers.uniqueIds(),
      type,
      accountNumber: parseInt(bankInfo.number, 10),
      cashier: parseInt(cashierId, 10),
      amount: parseFloat(amount),
      oldBalance: parseFloat(bankInfo.balance),
      newBalance,
    };
    return transactionData;
  }

  static debitAccountPostgre(amount, bankInfo, cashierId) {
    const type = 'Debit';
    const newBalance = parseFloat((parseFloat(bankInfo.balance)
      - parseFloat(amount)).toFixed(2));
    const transactionData = this.transactions(amount, bankInfo, cashierId, type, newBalance);
    return transactionData;
  }


  static creditAccountPostgre(amount, bankInfo, cashierId) {
    const type = 'Credit';
    const newBalance = parseFloat((parseFloat(bankInfo.balance)
      + parseFloat(amount)).toFixed(2));
    const transactionData = this.transactions(amount, bankInfo, cashierId, type, newBalance);
    return transactionData;
  }

  static transactionResPostgre(data) {
    const transactionResData = {
      transactionId: parseInt(data.id, 10),
      accountNumber: parseInt(data.account_no, 10),
      amount: parseFloat(data.amount),
      cashier: parseInt(data.cashier, 10),
      transactionType: String(data.type),
      accountBalance: parseFloat(data.new_balance),
    };
    return transactionResData;
  }

  /*
  static debitAccountTransaction(dataOne, dataTwo, dataThree) {
    const transactionData = {
      id: Math.floor(Math.random() * 1000000000),
      createdOn: new Date(),
      type: 'Debit',
      accountNumber: parseInt(dataTwo.accountNumber, 10),
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
      accountNumber: parseInt(dataTwo.accountNumber, 10),
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
  */
}
