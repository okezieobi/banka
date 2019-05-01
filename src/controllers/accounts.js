import accountData from '../db/accounts';
import userData from '../db/users';
import helpers from '../helpers/helper';
import models from '../models/accounts';
import transactionData from '../db/transactions';

export default class Accounts {
  static createAccount(req, res) {
    const findUser = helpers.findById(userData.users.clients, req.headers, 'id', 'owner-id');
    if (!findUser) return helpers.response(res, 400, 'error', 'Only registered users can create bank accounts, please sign up');
    const newBankAccount = models.bankAccount(req.body);
    accountData.accounts.push(newBankAccount);
    const bankAccountRes = models.createBankAccountResponse(newBankAccount, findUser);
    return helpers.response(res, 201, 'data', bankAccountRes);
  }

  static updateStatus(req, res) {
    if (!helpers.findById(userData.users.admins, req.headers, 'id', 'admin-id')) return helpers.response(res, 404, 'error', 'Admin id not found, only registered admins can update an account detail');
    const bankAccount = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    if (!bankAccount) return helpers.response(res, 404, 'error', 'Account number not found');
    if ((bankAccount.status).toLowerCase() === (req.body.accountStatus).toLowerCase()) return helpers.response(res, 400, 'error', `Account status is already ${req.body.accountStatus}`);
    bankAccount.status = req.body.accountStatus;
    const statusResponse = models.updateAccountStatus(bankAccount);
    return helpers.response(res, 200, 'data', statusResponse);
  }

  static deleteAccount(req, res) {
    if (!helpers.findById(userData.users.admins, req.headers, 'id', 'admin-id')) return helpers.response(res, 404, 'error', 'Admin not found, only registered admins can delete a bank account');
    const bankAccount = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    if (!bankAccount) return helpers.response(res, 404, 'error', 'Account number not found');
    accountData.accounts.splice(accountData.accounts.indexOf(bankAccount), 1);
    transactionData.transactions = transactionData.transactions.filter(
      transaction => transaction.accountNumber !== bankAccount.accountNumber,
    );
    return helpers.response(res, 200, 'message', 'Account successfully deleted');
  }
}
