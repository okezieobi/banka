import numbers from '../helpers/unique_no';

export default class Transactions {
  static transactions(amount, bankInfo, cashierId, type, newBalance) {
    const transactionData = {
      transactionId: numbers.uniqueIds(),
      type: String(type),
      accountNumber: parseInt(bankInfo.number, 10),
      cashier: parseInt(cashierId, 10),
      amount: parseFloat(amount),
      oldBalance: parseFloat(bankInfo.balance),
      newBalance: parseFloat((newBalance).toFixed(2)),
    };
    return transactionData;
  }

  static calcNewBalance(type, balance, amount) {
    let newBalance;
    if (type === 'Credit' || type === 'credit') {
      newBalance = parseFloat(balance) + parseFloat(amount);
    } else {
      newBalance = parseFloat(balance) - parseFloat(amount);
    }
    return newBalance;
  }

  static debitAccountPostgre(amount, bankInfo, cashierId) {
    const transactionData = this.transactions(amount, bankInfo, cashierId, 'Debit',
      this.calcNewBalance('Debit', bankInfo.balance, amount));
    return transactionData;
  }


  static creditAccountPostgre(amount, bankInfo, cashierId) {
    const transactionData = this.transactions(amount, bankInfo, cashierId, 'Credit',
      this.calcNewBalance('Credit', bankInfo.balance, amount));
    return transactionData;
  }

  static allTransactionsResPostgre(data) {
    const transactionResData = {
      transactionId: parseInt(data.id, 10),
      createdOn: String(data.created_on),
      accountNumber: parseInt(data.account_no, 10),
      amount: parseFloat(data.amount),
      cashier: parseInt(data.cashier, 10),
      transactionType: String(data.type),
    };
    return transactionResData;
  }

  static transactionResPostgre(data) {
    const transactionResData = this.allTransactionsResPostgre(data);
    transactionResData.accountBalance = parseFloat(data.new_balance);

    return transactionResData;
  }

  static getTransaction(data) {
    const transactionData = this.allTransactionsResPostgre(data);
    transactionData.oldBalance = parseFloat(data.old_balance);
    transactionData.newBalance = parseFloat(data.new_balance);
    return transactionData;
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
