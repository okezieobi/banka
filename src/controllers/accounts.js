import accountData from '../db/accounts';
import userData from '../db/users';
import helpers from '../helpers/helper';
import models from '../models/accounts';
import transactionData from '../db/transactions';
import database from '../db/pgConnect';
import numbers from '../helpers/unique_no';
import authenticate from '../middleware/authenticate';

export default class Accounts {
  static async createAccount(req, res) {
    const { bankAccountType } = req.body;
    const { findClient } = authenticate;
    const createAccountQuery = 'INSERT INTO accounts(id, number, owner, type) VALUES ($1, $2, $3, $4) RETURNING *';
    const accountId = await numbers.uniqueIds();
    const accountNumber = await numbers.accountNo();
    const arrayData = [accountId, accountNumber, findClient.id, bankAccountType];
    const newBankAccount = await database.queryOne(createAccountQuery, arrayData);
    const bankAccountRes = await models.createBankAccountResPostgre(newBankAccount, findClient);
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
