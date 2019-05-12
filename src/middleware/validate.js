import test from '../helpers/regexTests';
import protocol from '../helpers/response';
import errors from '../helpers/errorMessage';

export default class Valdiate {
  static checkEmailAndPassword(email, password) {
    const validateEmail = test.validateEmail(email);
    const validatePassword = test.validatePassword(password);
    let errMessage;
    if (!email) errMessage = errors.isRequired('Email');
    else if (!validateEmail) errMessage = errors.notEmail();
    else if (!password) errMessage = errors.isRequired('Password');
    else if (!validatePassword) errMessage = errors.notPassword();
    return errMessage;
  }

  static checkFirstAndLastName(firstName, lastName) {
    const checkFirstName = test.checkName(firstName);
    const checkLastName = test.checkName(lastName);
    let errMessage;
    if (!firstName) errMessage = errors.isRequired('First name');
    else if (!checkFirstName) errMessage = errors.notLetters('First name');
    else if (!lastName) errMessage = errors.isRequired('Last name');
    else if (!checkLastName) errMessage = errors.notLetters('Last name');
    return errMessage;
  }

  static signUpInputs(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const errResFirstAndLastName = this.checkFirstAndLastName(userFirstName, userLastName);
    const errResEmailAndPassword = this.checkEmailAndPassword(userEmail, userPassword);
    if (errResFirstAndLastName) protocol.response(res, 400, 'error', errResFirstAndLastName);
    else if (errResEmailAndPassword) protocol.response(res, 400, 'error', errResEmailAndPassword);
    else next();
  }

  static signInInputs(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const errRes = this.checkEmailAndPassword(userEmail, userPassword);
    if (errRes) protocol.response(res, 400, 'error', errRes);
    else next();
  }

  static adminStaffinputs(req, res, next) {
    const { userName, adminStaffPassword } = req.body;
    const checkUsername = test.checkUserName(userName);
    const checkPassword = test.validatePassword(adminStaffPassword);
    if (!userName) protocol.response(res, 400, 'error', errors.isRequired('Username'));
    else if (!checkUsername) protocol.response(res, 400, 'error', errors.notLetters('Username'));
    else if (!adminStaffPassword) protocol.response(res, 400, 'error', errors.isRequired('Password'));
    else if (!checkPassword) protocol.response(res, 400, 'error', errors.notPassword());
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    const { bankAccountType } = req.body;
    const checkBankAccountType = test.checkName(bankAccountType);
    if (!bankAccountType) protocol.response(res, 400, 'error', errors.isRequired('Bank account type'));
    else if (!checkBankAccountType) protocol.response(res, 400, 'error', errors.notLetters('Bank account type'));
    else if (bankAccountType !== 'current' && bankAccountType !== 'savings'
      && bankAccountType !== 'Current' && bankAccountType !== 'Savings') protocol.response(res, 400, 'error', 'Bank account type must be savings or current');
    else next();
  }

  static transactionInputs(req, res, next) {
    const { transactionAmount } = req.body;
    const cashierId = req.headers['cashier-id'];
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = test.checkNumber(transactionAmount);
    const checkAccountNumber = test.checkNumber(accountNumber);
    const checkCashierId = test.checkNumber(cashierId);
    if (!transactionAmount) protocol.response(res, 400, 'error', errors.isRequired('Transaction amount'));
    else if (!checkTransactionAmount) protocol.response(res, 400, 'error', errors.notNumbers('Transaction amount'));
    else if (!checkAccountNumber) protocol.response(res, 400, 'error', errors.notNumbers('Account number'));
    else if (!cashierId) protocol.response(res, 400, 'error', errors.isRequired('Cashier id'));
    else if (!checkCashierId) protocol.response(res, 400, 'error', errors.notNumbers('Cashier id'));
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const checkAccountNumber = test.checkNumber(accountNumber);
    const checkAdminId = test.checkNumber(adminId);
    if (!adminId) protocol.response(res, 400, 'error', errors.isRequired('Admin id'));
    else if (!checkAdminId) protocol.response(res, 400, 'error', errors.notNumbers('Admin id'));
    else if (!accountNumber) protocol.response(res, 400, 'error', errors.isRequired('Account number'));
    else if (!checkAccountNumber) protocol.response(res, 400, 'error', errors.notNumbers('Account number'));
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    const { accountStatus } = req.body;
    const checkAccountStatus = test.checkName(accountStatus);
    const accountNumber = req.params.account_number;
    const checkAccountNumber = test.checkNumber(accountNumber);
    if (!accountNumber) protocol.response(res, 400, 'error', errors.isRequired('Account number'));
    else if (!checkAccountNumber) protocol.response(res, 400, 'error', errors.notNumbers('Account number'));
    else if (!accountStatus) protocol.response(res, 400, 'error', errors.isRequired('Account status'));
    else if (!checkAccountStatus) protocol.response(res, 400, 'error', errors.notLetters('Account status'));
    else if (accountStatus !== 'active' && accountStatus !== 'Active'
      && accountStatus !== 'dormant' && accountStatus !== 'Dormant') protocol.response(res, 400, 'error', 'Account status must equal active or dormant');
    else next();
  }
}
