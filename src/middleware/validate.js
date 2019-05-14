import protocol from '../helpers/response';
import errors from '../helpers/checkRequest';

export default class Valdiate {
  static signUpInputs(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const firstNameErr = errors.validateLetters(userFirstName, 'First name');
    const lastNameErr = errors.validateLetters(userLastName, 'Last name');
    const emailErr = errors.checkEmailFormat(userEmail, 'Email');
    const passwordErr = errors.checkPassword(userPassword, 'Password');
    if (firstNameErr) protocol.err400Res(res, firstNameErr);
    else if (lastNameErr) protocol.err400Res(res, lastNameErr);
    else if (emailErr) protocol.err400Res(res, emailErr);
    else if (passwordErr) protocol.err400Res(res, passwordErr);
    else next();
  }

  static signInInputs(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const emailErr = errors.checkEmailFormat(userEmail, 'Email');
    const passwordErr = errors.checkPassword(userPassword, 'Password');
    if (emailErr) protocol.err400Res(res, emailErr);
    else if (passwordErr) protocol.err400Res(res, passwordErr);
    else next();
  }

  static adminStaffinputs(req, res, next) {
    const { userName, adminStaffPassword } = req.body;
    const usernameErr = errors.validateUsername(userName, 'Username');
    const passwordErr = errors.checkPassword(adminStaffPassword, 'Password');
    if (usernameErr) protocol.err400Res(res, usernameErr);
    else if (passwordErr) protocol.err400Res(res, passwordErr);
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    const { bankAccountType } = req.body;
    const checkBankAccountType = errors.validateLetters(bankAccountType, 'Bank account type');
    if (checkBankAccountType) protocol.err400Res(res, checkBankAccountType);
    else if (bankAccountType !== 'current' && bankAccountType !== 'savings'
      && bankAccountType !== 'Current' && bankAccountType !== 'Savings') protocol.err400Res(res, 'Bank account type must be savings or current');
    else next();
  }

  static transactionInputs(req, res, next) {
    const { transactionAmount } = req.body;
    const cashierId = req.headers['cashier-id'];
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = errors.validateNumber(transactionAmount, 'Transaction amount');
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    const checkCashierId = errors.validateNumber(cashierId, 'Cashier id');
    if (checkTransactionAmount) protocol.err400Res(res, checkTransactionAmount);
    else if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else if (checkCashierId) protocol.err400Res(res, checkCashierId);
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    const adminId = req.headers['admin-id'];
    const accountNumber = req.params.account_number;
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    const checkAdminId = errors.validateNumber(adminId, 'Admin id');
    if (checkAdminId) protocol.err400Res(res, checkAdminId);
    else if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    const { accountStatus } = req.body;
    const accountNumber = req.params.account_number;
    const checkAccountStatus = errors.validateLetters(accountStatus, 'Account status');
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else if (checkAccountStatus) protocol.err400Res(res, checkAccountStatus);
    else if (accountStatus !== 'active' && accountStatus !== 'Active'
      && accountStatus !== 'dormant' && accountStatus !== 'Dormant') protocol.err400Res(res, 'Account status must equal active or dormant');
    else next();
  }
}
