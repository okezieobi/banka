import helpers from '../helpers/helper';

export default class Valdiate {
  static checkEmailAndPassword(email, password) {
    const validateEmail = helpers.validateEmail(email);
    const validatePassword = helpers.validatePassword(password);
    let errMessage;
    if (!email) errMessage = helpers.isRequired('Email');
    else if (!validateEmail) errMessage = helpers.notEmail();
    else if (!password) errMessage = helpers.isRequired('Password');
    else if (!validatePassword) errMessage = helpers.notPassword();
    return errMessage;
  }

  static checkFirstAndLastName(firstName, lastName) {
    const checkFirstName = helpers.checkName(firstName);
    const checkLastName = helpers.checkName(lastName);
    let errMessage;
    if (!firstName) errMessage = helpers.isRequired('First name');
    else if (!checkFirstName) errMessage = helpers.notLetters('First name');
    else if (!lastName) errMessage = helpers.isRequired('Last name');
    else if (!checkLastName) errMessage = helpers.notLetters('Last name');
    return errMessage;
  }

  static signUpInputs(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const errResFirstAndLastName = this.checkFirstAndLastName(userFirstName, userLastName);
    const errResEmailAndPassword = this.checkEmailAndPassword(userEmail, userPassword);
    if (errResFirstAndLastName) helpers.response(res, 400, 'error', errResFirstAndLastName);
    else if (errResEmailAndPassword) helpers.response(res, 400, 'error', errResEmailAndPassword);
    else next();
  }

  static signInInputs(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const errRes = this.checkEmailAndPassword(userEmail, userPassword);
    if (errRes) helpers.response(res, 400, 'error', errRes);
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    const { bankAccountType } = req.body;
    const ownerId = req.headers['owner-id'];
    const checkOwnerId = helpers.checkNumber(ownerId);
    const checkBankAccountType = helpers.checkName(bankAccountType);
    if (!ownerId) helpers.response(res, 400, 'error', helpers.isRequired('User id'));
    else if (!checkOwnerId) helpers.response(res, 400, 'error', helpers.notNumbers('User id'));
    else if (!bankAccountType) helpers.response(res, 400, 'error', helpers.isRequired('Bank account type'));
    else if (!checkBankAccountType) helpers.response(res, 400, 'error', helpers.notLetters('Bank account type'));
    else if (bankAccountType !== 'current' && bankAccountType !== 'savings'
      && bankAccountType !== 'Current' && bankAccountType !== 'Savings') helpers.response(res, 400, 'error', 'Bank account type must be savings or current');
    else next();
  }

  static transactionInputs(req, res, next) {
    const { transactionAmount } = req.body;
    const cashierId = req.headers['cashier-id'];
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = helpers.checkNumber(transactionAmount);
    const checkAccountNumber = helpers.checkNumber(accountNumber);
    const checkCashierId = helpers.checkNumber(cashierId);
    if (!transactionAmount) helpers.response(res, 400, 'error', helpers.isRequired('Transaction amount'));
    else if (!checkTransactionAmount) helpers.response(res, 400, 'error', helpers.notNumbers('Transaction amount'));
    else if (!checkAccountNumber) helpers.response(res, 400, 'error', helpers.notNumbers('Account number'));
    else if (!cashierId) helpers.response(res, 400, 'error', helpers.isRequired('Cashier id'));
    else if (!checkCashierId) helpers.response(res, 400, 'error', helpers.notNumbers('Cashier id'));
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const adminIdAndAccountNumberErr = this.checkAdminIdAndAccountNumber(adminId, accountNumber);
    if (adminIdAndAccountNumberErr) helpers.response(res, 400, 'error', adminIdAndAccountNumberErr);
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    const { accountStatus } = req.body;
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const checkAccountStatus = helpers.checkName(accountStatus);
    const adminIdAndAccountNumberErr = this.checkAdminIdAndAccountNumber(adminId, accountNumber);
    if (!accountStatus) helpers.response(res, 400, 'error', helpers.isRequired('Account status'));
    else if (!checkAccountStatus) helpers.response(res, 400, 'error', helpers.notLetters('Account status'));
    else if (accountStatus !== 'active' && accountStatus !== 'Active'
      && accountStatus !== 'dormant' && accountStatus !== 'Dormant') helpers.response(res, 400, 'error', 'Account status must equal active or dormant');
    else if (adminIdAndAccountNumberErr) helpers.response(res, 400, 'error', adminIdAndAccountNumberErr);
    else next();
  }

  static checkAdminIdAndAccountNumber(adminId, accountNumber) {
    const checkAdminId = helpers.checkNumber(adminId);
    const checkAccountNumber = helpers.checkNumber(accountNumber);
    let errMessage;
    if (!adminId) errMessage = helpers.isRequired('Admin id');
    else if (!checkAdminId) errMessage = helpers.notNumbers('Admin id');
    else if (!checkAccountNumber) errMessage = helpers.notNumbers('Account number');
    return errMessage;
  }
}
