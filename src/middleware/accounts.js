import validateAccountRequest from '../data/accounts';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Accounts {
  static verifyAccount() {
    const authAccount = authenticateAccount.account.bind(authenticateAccount);
    return authAccount;
  }

  static authenticateAdmin() {
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    return authAdmin;
  }

  static authClient() {
    const client = authenticateUsers.clients.bind(authenticateUsers);
    return client;
  }

  static createAccount() {
    const validate = validateAccountRequest.createAccount.bind(validateAccountRequest);
    const auth = authenticateUsers.clients.bind(authenticateUsers);
    const newAccount = middleware.routeCallbacks(validate, auth);
    return newAccount;
  }

  static deleteAccount() {
    const validate = validateAccountRequest.deleteAccount.bind(validateAccountRequest);
    const deleteAccount = middleware.routeCallbacks(validate,
      this.authenticateAdmin(), this.verifyAccount());
    return deleteAccount;
  }

  static updateAccountStatus() {
    const validate = validateAccountRequest.updateAccountStatus.bind(validateAccountRequest);
    const updateStatus = middleware.routeCallbacks(validate, this.authenticateAdmin(),
      this.verifyAccount());
    return updateStatus;
  }

  static getAccountHistory() {
    const validate = validateAccountRequest.accountHisory.bind(validateAccountRequest);
    const getHistory = middleware.routeCallbacks(validate, this.authClient(), this.verifyAccount());
    return getHistory;
  }
}
