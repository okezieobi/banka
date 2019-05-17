import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';
import database from '../db/pgConnect';
import queries from '../helpers/queries';


export class ValidateAccountInput {
  static createAccount(req, res, next) {
    const { bankAccountType } = req.body;
    const checkBankAccountType = checkRequest.validateLetters(bankAccountType, 'Bank account type');
    const checkBankAccountTypeValue = checkRequest.checkValue(bankAccountType, 'Bank account type must be savings or current', 'current', 'savings', 'Current', 'Savings');
    const findErr = checkRequest.findError(checkBankAccountType);
    if (findErr) protocol.err400Res(res, findErr);
    else if (checkBankAccountTypeValue) protocol.err400Res(res, checkBankAccountTypeValue);
    else next();
  }


  static deleteAccount(req, res, next) {
    const accountNumber = req.params.account_number;
    const checkAccountNumber = checkRequest.validateNumber(accountNumber, 'Account number');
    if (checkAccountNumber) protocol.err400Res(res, checkAccountNumber);
    else next();
  }

  static updateAccountStatus(req, res, next) {
    const { accountStatus } = req.body;
    const accountNumber = req.params.account_number;
    const checkAccountStatus = checkRequest.validateLetters(accountStatus, 'Account status');
    const checkAccountNumber = checkRequest.validateNumber(accountNumber, 'Account number');
    const checkAccountStatusValue = checkRequest.checkValue(accountStatus,
      'Account status must equal active or dormant', 'active', 'Active', 'dormant', 'Dormant');
    const findError = checkRequest.findError(checkAccountStatus, checkAccountNumber);
    if (findError) protocol.err400Res(res, findError);
    else if (checkAccountStatusValue) protocol.err400Res(res, checkAccountStatusValue);
    else next();
  }
}

export class AuthenticateAccount {
  static async account(req, res, next) {
    const accountNumber = req.params.account_number;
    const verifyAccountQuery = queries.findAccountByNo();
    this.bankAccount = await database.queryOneORNone(verifyAccountQuery, [accountNumber]);
    if (!this.bankAccount) return protocol.err404Res(res, 'Bank account not found');
    return next();
  }
}
