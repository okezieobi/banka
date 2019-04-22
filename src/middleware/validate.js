import helpers from '../helpers/helper';

export default class Valdiate {
  static signUpInputs(req, res, next) {
    if (!req.body.userFirstName) return helpers.errorResponse(res, 400, 'First name is required');
    if (!helpers.checkName(req.body.userFirstName)) return helpers.errorResponse(res, 400, 'First name must be letters');
    if (!req.body.userLastName) return helpers.errorResponse(res, 400, 'Last name is required');
    if (!helpers.checkName(req.body.userLastName)) return helpers.errorResponse(res, 400, 'Last name must be letters');
    if (!req.body.userEmail) return helpers.errorResponse(res, 400, 'Email is required');
    if (!helpers.validateEmail(req.body.userEmail)) return helpers.errorResponse(res, 400, 'Email format is wrong');
    if (!req.body.userPassword) return helpers.errorResponse(res, 400, 'Password is required');
    if (!helpers.validatePassword(req.body.userPassword)) return helpers.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    return next();
  }

  static signInInputs(req, res, next) {
    if (!req.body.userEmail) return helpers.errorResponse(res, 400, 'Email is required');
    if (!helpers.validateEmail(req.body.userEmail)) return helpers.errorResponse(res, 400, 'Email format is wrong');
    if (!req.body.userPassword) return helpers.errorResponse(res, 400, 'Password is required');
    if (!helpers.validatePassword(req.body.userPassword)) return helpers.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    return next();
  }

  static createBankAccountInputs(req, res, next) {
    if (!req.headers['owner-id']) return helpers.errorResponse(res, 400, 'User Id is required');
    if (!helpers.checkNumber(req.headers['owner-id'])) return helpers.errorResponse(res, 400, 'User id must be numbers');
    if (!req.body.bankAccountType) return helpers.errorResponse(res, 400, 'Bank account type is required');
    if (!helpers.checkName(req.body.bankAccountType)) return helpers.errorResponse(res, 400, 'Bank account type must be letters');
    if (req.body.bankAccountType !== 'current' && req.body.bankAccountType !== 'savings'
      && req.body.bankAccountType !== 'Current' && req.body.bankAccountType !== 'Savings') return helpers.errorResponse(res, 400, 'Bank account type must be savings or current');
    return next();
  }

  static transactionInputs(req, res, next) {
    if (!req.body.transactionAmount) return helpers.errorResponse(res, 400, 'Transaction amount is required');
    if (!helpers.checkNumber(req.body.transactionAmount)) return helpers.errorResponse(res, 400, 'Transaction amount must be numbers');
    if (!helpers.checkNumber(req.params.account_number)) return helpers.errorResponse(res, 400, 'Account number must be numbers');
    if (!req.headers['cashier-id']) return helpers.errorResponse(res, 400, 'Cashier id is required');
    if (!helpers.checkNumber(req.headers['cashier-id'])) return helpers.errorResponse(res, 400, 'Cashier id must be numbers');
    return next();
  }

  static deleteAccountInputs(req, res, next) {
    if (!req.headers['admin-id']) return helpers.errorResponse(res, 400, 'Admin id is required');
    if (!helpers.checkNumber(req.headers['admin-id'])) return helpers.errorResponse(res, 400, 'Admin id must be numbers');
    if (!helpers.checkNumber(req.params.account_number)) return helpers.errorResponse(res, 400, 'Account number must be numbers');
    return next();
  }

  static updateAccountStatusInput(req, res, next) {
    if (!req.body.accountStatus) return helpers.errorResponse(res, 400, 'Account status is required');
    if (!helpers.checkName(req.body.accountStatus)) return helpers.errorResponse(res, 400, 'Account status must be letters');
    if (req.body.accountStatus !== 'active' && req.body.accountStatus !== 'Active'
      && req.body.accountStatus !== 'dormant' && req.body.accountStatus !== 'Dormant') return helpers.errorResponse(res, 400, 'Account status must equal active or dormant');
    if (!req.headers['admin-id']) return helpers.errorResponse(res, 400, 'Admin id is required');
    if (!helpers.checkNumber(req.headers['admin-id'])) return helpers.errorResponse(res, 400, 'Admin id must be numbers');
    if (!helpers.checkNumber(req.params.account_number)) return helpers.errorResponse(res, 400, 'Account number must be a number');
    return next();
  }
}
