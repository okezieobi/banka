import validateTransactionRequests from '../data/tranasactions';
import authenticateTransactions from '../auth/transactions';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Transactions {
  static verifyTransactionRequest() {
    const validate = validateTransactionRequests.transaction.bind(validateTransactionRequests);
    return validate;
  }

  static verifyAccount() {
    const account = authenticateAccount.account.bind(authenticateAccount);
    return account;
  }

  static authStaff() {
    const staff = authenticateUsers.staff.bind(authenticateUsers);
    return staff;
  }

  static debitAccount() {
    const verifyStatus = authenticateTransactions.accountStatus.bind(authenticateTransactions);
    const verifyBalance = authenticateTransactions.accountBalance.bind(authenticateTransactions);
    const debit = middleware.routeCallbacks(this.verifyTransactionRequest(), this.authStaff(),
      this.verifyAccount(), verifyStatus, verifyBalance);
    return debit;
  }

  static creditAccount() {
    const credit = middleware.routeCallbacks(this.verifyTransactionRequest(), this.verifyAccount());
    return credit;
  }
}
