import validateTransactionRequests from '../data/tranasactions';
import authenticateTransactions from '../auth/transactions';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Transactions {
  static verifyTransactionRequest() {
    const validate = (...args) => { validateTransactionRequests.transaction(...args); };
    return validate;
  }

  static verifyAccount() {
    const account = (...args) => { authenticateAccount.account(...args); };
    return account;
  }

  static authStaff() {
    const staff = (...args) => { authenticateUsers.staff(...args); };
    return staff;
  }

  static debitAccount() {
    const verifyStatus = (...args) => { authenticateTransactions.accountStatus(...args); };
    const verifyBalance = (...args) => { authenticateTransactions.accountBalance(...args); };
    const debit = middleware.routeCallbacks(this.verifyTransactionRequest(), this.authStaff(),
      this.verifyAccount(), verifyStatus, verifyBalance);
    return debit;
  }

  static creditAccount() {
    const credit = middleware.routeCallbacks(this.verifyTransactionRequest(), this.verifyAccount());
    return credit;
  }
}
