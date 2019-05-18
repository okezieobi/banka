import validateTransactionRequests from '../data/tranasactions';
import middleware from './middleware';

export default class Transactions {
  static verifyTransactionRequest() {
    const validate = (...args) => { validateTransactionRequests.transaction(...args); };
    return validate;
  }

  static debitAccount() {
    const debit = middleware.routeCallbacks(this.verifyTransactionRequest());
    return debit;
  }

  static creditAccount() {
    const credit = middleware.routeCallbacks(this.verifyTransactionRequest());
    return credit;
  }
}
