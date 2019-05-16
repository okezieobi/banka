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
    const findError = errors.findError(firstNameErr, lastNameErr, emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static signInInputs(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const emailErr = errors.checkEmailFormat(userEmail, 'Email');
    const passwordErr = errors.checkPassword(userPassword, 'Password');
    const findError = errors.findError(emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static adminStaffinputs(req, res, next) {
    const { userName, adminStaffPassword } = req.body;
    const usernameErr = errors.validateUsername(userName, 'Username');
    const passwordErr = errors.checkPassword(adminStaffPassword, 'Password');
    const findError = errors.findError(usernameErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    const { bankAccountType } = req.body;
    const checkBankAccountType = errors.validateLetters(bankAccountType, 'Bank account type');
    const checkBankAccountTypeValue = errors.checkValue(bankAccountType, 'Bank account type must be savings or current', 'current', 'savings', 'Current', 'Savings');
    const findErr = errors.findError(checkBankAccountType);
    if (findErr) protocol.err400Res(res, findErr);
    else if (checkBankAccountTypeValue) protocol.err400Res(res, checkBankAccountTypeValue);
    else next();
  }

  static transactionInputs(req, res, next) {
    const { transactionAmount } = req.body;
    const cashierId = req.headers['cashier-id'];
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = errors.validateNumber(transactionAmount, 'Transaction amount');
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    const checkCashierId = errors.validateNumber(cashierId, 'Cashier id');
    const findError = errors.findError(checkTransactionAmount, checkAccountNumber, checkCashierId);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    const accountNumber = req.params.account_number;
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    const { accountStatus } = req.body;
    const accountNumber = req.params.account_number;
    const checkAccountStatus = errors.validateLetters(accountStatus, 'Account status');
    const checkAccountNumber = errors.validateNumber(accountNumber, 'Account number');
    const checkAccountStatusValue = errors.checkValue(accountStatus,
      'Account status must equal active or dormant', 'active', 'Active', 'dormant', 'Dormant');
    const findError = errors.findError(checkAccountStatus, checkAccountNumber);
    if (findError) protocol.err400Res(res, findError);
    else if (checkAccountStatusValue) protocol.err400Res(res, checkAccountStatusValue);
    else next();
  }
}
