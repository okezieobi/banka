import helpers from '../helpers/helper';

export default class Valdiate {
  static signUpInputs(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const checkFirstName = helpers.checkName(userFirstName);
    const checkLastName = helpers.checkName(userLastName);
    const validateEmail = helpers.validateEmail(userEmail);
    const validatePassword = helpers.validatePassword(userPassword);
    if (!userFirstName) helpers.response(res, 400, 'error', 'First name is required');
    else if (!checkFirstName) helpers.response(res, 400, 'error', 'First name must be letters');
    else if (!userLastName) helpers.response(res, 400, 'error', 'Last name is required');
    else if (!checkLastName) helpers.response(res, 400, 'error', 'Last name must be letters');
    else if (!userEmail) helpers.response(res, 400, 'error', 'Email is required');
    else if (!validateEmail) helpers.response(res, 400, 'error', 'Email format is wrong');
    else if (!userPassword) helpers.response(res, 400, 'error', 'Password is required');
    else if (!validatePassword) helpers.response(res, 400, 'error', 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    else next();
  }

  static signInInputs(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const validateEmail = helpers.validateEmail(userEmail);
    const validatePassword = helpers.validatePassword(userPassword);
    if (!userEmail) helpers.response(res, 400, 'error', 'Email is required');
    else if (!validateEmail) helpers.response(res, 400, 'error', 'Email format is wrong');
    else if (!userPassword) helpers.response(res, 400, 'error', 'Password is required');
    else if (!validatePassword) helpers.response(res, 400, 'error', 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    const { bankAccountType } = req.body;
    const ownerId = req.headers['owner-id'];
    const checkOwnerId = helpers.checkNumber(ownerId);
    const checkBankAccountType = helpers.checkName(bankAccountType);
    if (!ownerId) helpers.response(res, 400, 'error', 'User Id is required');
    else if (!checkOwnerId) helpers.response(res, 400, 'error', 'User id must be numbers');
    else if (!bankAccountType) helpers.response(res, 400, 'error', 'Bank account type is required');
    else if (!checkBankAccountType) helpers.response(res, 400, 'error', 'Bank account type must be letters');
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
    if (!transactionAmount) helpers.response(res, 400, 'error', 'Transaction amount is required');
    else if (!checkTransactionAmount) helpers.response(res, 400, 'error', 'Transaction amount must be numbers');
    else if (!checkAccountNumber) helpers.response(res, 400, 'error', 'Account number must be numbers');
    else if (!cashierId) helpers.response(res, 400, 'error', 'Cashier id is required');
    else if (!checkCashierId) helpers.response(res, 400, 'error', 'Cashier id must be numbers');
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const checkAdminId = helpers.checkNumber(adminId);
    const checkAccountNumber = helpers.checkNumber(accountNumber);
    if (!adminId) helpers.response(res, 400, 'error', 'Admin id is required');
    else if (!checkAdminId) helpers.response(res, 400, 'error', 'Admin id must be numbers');
    else if (!checkAccountNumber) helpers.response(res, 400, 'error', 'Account number must be numbers');
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    const { accountStatus } = req.body;
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const checkAccountStatus = helpers.checkName(accountStatus);
    const checkAdminId = helpers.checkNumber(adminId);
    const checkAccountNumber = helpers.checkNumber(accountNumber);
    if (!accountStatus) helpers.response(res, 400, 'error', 'Account status is required');
    else if (!checkAccountStatus) helpers.response(res, 400, 'error', 'Account status must be letters');
    else if (accountStatus !== 'active' && accountStatus !== 'Active'
      && accountStatus !== 'dormant' && accountStatus !== 'Dormant') helpers.response(res, 400, 'error', 'Account status must equal active or dormant');
    else if (!adminId) helpers.response(res, 400, 'error', 'Admin id is required');
    else if (!checkAdminId) helpers.response(res, 400, 'error', 'Admin id must be numbers');
    else if (!checkAccountNumber) helpers.response(res, 400, 'error', 'Account number must be a number');
    else next();
  }
}
