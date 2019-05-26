import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';

export default class ValidateAccountRequest {
  static createAccount(req, res, next) {
    const { bankAccountType } = req.body;
    const checkBankAccountType = checkRequest.validateLetters(bankAccountType, 'Bank account type');
    const checkBankAccountTypeValue = checkRequest.checkValue(bankAccountType, 'Bank account type must be savings or current', 'current', 'savings', 'Current', 'Savings');
    const findErr = checkRequest.findError(checkBankAccountType);
    if (findErr) protocol.err400Res(res, findErr);
    else if (checkBankAccountTypeValue) protocol.err400Res(res, checkBankAccountTypeValue);
    else next();
  }

  static checkAccountNumber(req, res, next) {
    const accountNumber = req.params.account_number;
    const checkAccountNumber = checkRequest.validateInteger(accountNumber, 'Account number');
    if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else next();
  }

  static deleteAccount(req, res, next) {
    const deleteAccount = this.checkAccountNumber(req, res, next);
    return deleteAccount;
  }

  static accountHisory(req, res, next) {
    const accountHistory = this.checkAccountNumber(req, res, next);
    return accountHistory;
  }

  static updateAccountStatus(req, res, next) {
    const { accountStatus } = req.body;
    const accountNumber = req.params.account_number;
    const checkAccountStatus = checkRequest.validateLetters(accountStatus, 'Account status');
    const checkAccountNumber = checkRequest.validateInteger(accountNumber, 'Account number');
    const checkAccountStatusValue = checkRequest.checkValue(accountStatus,
      'Account status must equal active or dormant', 'active', 'Active', 'dormant', 'Dormant');
    const findError = checkRequest.findError(checkAccountStatus, checkAccountNumber);
    if (findError) protocol.err400Res(res, findError);
    else if (checkAccountStatusValue) protocol.err400Res(res, checkAccountStatusValue);
    else next();
  }
}
