import validateAccountRequest from '../data/accounts';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Accounts {
  static verifyAccount() {
    const authAccount = (...args) => { authenticateAccount.account(...args); };
    return authAccount;
  }

  static authenticateAdmin() {
    const authAdmin = (...args) => { authenticateUsers.admin(...args); };
    return authAdmin;
  }

  static createAccount() {
    const validate = (...args) => { validateAccountRequest.createAccount(...args); };
    const auth = (...args) => { authenticateUsers.clients(...args); };
    const newAccount = middleware.routeCallbacks(validate, auth);
    return newAccount;
  }

  static deleteAccount() {
    const validate = (...args) => { validateAccountRequest.deleteAccount(...args); };
    const deleteAccount = middleware.routeCallbacks(validate,
      this.authenticateAdmin(), this.verifyAccount());
    return deleteAccount;
  }

  static updateAccountStatus() {
    const validate = (...args) => { validateAccountRequest.updateAccountStatus(...args); };
    const updateStatus = middleware.routeCallbacks(validate, this.authenticateAdmin(),
      this.verifyAccount());
    return updateStatus;
  }
}
