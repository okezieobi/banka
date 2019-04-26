import helpers from '../helpers/helper';

export default class Valdiate {
  static signUpInputs(req, res, next) {
    if (!req.body.userFirstName) helpers.response(res, 400, 'error', 'First name is required');
    else if (!helpers.checkName(req.body.userFirstName)) helpers.response(res, 400, 'error', 'First name must be letters');
    else if (!req.body.userLastName) helpers.response(res, 400, 'error', 'Last name is required');
    else if (!helpers.checkName(req.body.userLastName)) helpers.response(res, 400, 'error', 'Last name must be letters');
    else if (!req.body.userEmail) helpers.response(res, 400, 'error', 'Email is required');
    else if (!helpers.validateEmail(req.body.userEmail)) helpers.response(res, 400, 'error', 'Email format is wrong');
    else if (!req.body.userPassword) helpers.response(res, 400, 'error', 'Password is required');
    else if (!helpers.validatePassword(req.body.userPassword)) helpers.response(res, 400, 'error', 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    else next();
  }

  static signInInputs(req, res, next) {
    if (!req.body.userEmail) helpers.response(res, 400, 'error', 'Email is required');
    else if (!helpers.validateEmail(req.body.userEmail)) helpers.response(res, 400, 'error', 'Email format is wrong');
    else if (!req.body.userPassword) helpers.response(res, 400, 'error', 'Password is required');
    else if (!helpers.validatePassword(req.body.userPassword)) helpers.response(res, 400, 'error', 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    else next();
  }

  static createBankAccountInputs(req, res, next) {
    if (!req.headers['owner-id']) helpers.response(res, 400, 'error', 'User Id is required');
    else if (!helpers.checkNumber(req.headers['owner-id'])) helpers.response(res, 400, 'error', 'User id must be numbers');
    else if (!req.body.bankAccountType) helpers.response(res, 400, 'error', 'Bank account type is required');
    else if (!helpers.checkName(req.body.bankAccountType)) helpers.response(res, 400, 'error', 'Bank account type must be letters');
    else if (req.body.bankAccountType !== 'current' && req.body.bankAccountType !== 'savings'
      && req.body.bankAccountType !== 'Current' && req.body.bankAccountType !== 'Savings') helpers.response(res, 400, 'error', 'Bank account type must be savings or current');
    else next();
  }

  static transactionInputs(req, res, next) {
    if (!req.body.transactionAmount) helpers.response(res, 400, 'error', 'Transaction amount is required');
    else if (!helpers.checkNumber(req.body.transactionAmount)) helpers.response(res, 400, 'error', 'Transaction amount must be numbers');
    else if (!helpers.checkNumber(req.params.account_number)) helpers.response(res, 400, 'error', 'Account number must be numbers');
    else if (!req.headers['cashier-id']) helpers.response(res, 400, 'error', 'Cashier id is required');
    else if (!helpers.checkNumber(req.headers['cashier-id'])) helpers.response(res, 400, 'error', 'Cashier id must be numbers');
    else next();
  }

  static deleteAccountInputs(req, res, next) {
    if (!req.headers['admin-id']) helpers.response(res, 400, 'error', 'Admin id is required');
    else if (!helpers.checkNumber(req.headers['admin-id'])) helpers.response(res, 400, 'error', 'Admin id must be numbers');
    else if (!helpers.checkNumber(req.params.account_number)) helpers.response(res, 400, 'error', 'Account number must be numbers');
    else next();
  }

  static updateAccountStatusInput(req, res, next) {
    if (!req.body.accountStatus) helpers.response(res, 400, 'error', 'Account status is required');
    else if (!helpers.checkName(req.body.accountStatus)) helpers.response(res, 400, 'error', 'Account status must be letters');
    else if (req.body.accountStatus !== 'active' && req.body.accountStatus !== 'Active'
      && req.body.accountStatus !== 'dormant' && req.body.accountStatus !== 'Dormant') helpers.response(res, 400, 'error', 'Account status must equal active or dormant');
    else if (!req.headers['admin-id']) helpers.response(res, 400, 'error', 'Admin id is required');
    else if (!helpers.checkNumber(req.headers['admin-id'])) helpers.response(res, 400, 'error', 'Admin id must be numbers');
    else if (!helpers.checkNumber(req.params.account_number)) helpers.response(res, 400, 'error', 'Account number must be a number');
    else next();
  }
}
