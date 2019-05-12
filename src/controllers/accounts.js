import accountData from '../db/accounts';
import userData from '../db/users';
import helpers from '../helpers/searchArray';
import models from '../models/accounts';
import transactionData from '../db/transactions';
import database from '../db/pgConnect';
import numbers from '../helpers/unique_no';
import authenticate from '../middleware/authenticate';
import protocol from '../helpers/response';

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
    return protocol.response(res, 201, 'data', bankAccountRes);
  }

  static async updateStatus(req, res) {
    const { bankAccount } = authenticate;
    const { accountStatus } = req.body;
    if ((bankAccount.status).toLowerCase() === (accountStatus).toLowerCase()) return protocol.response(res, 400, 'error', `Account status is already ${accountStatus}`);
    const updateAccountQuery = 'UPDATE accounts SET status = $1 WHERE id = $2 RETURNING *';
    const arrayData = [accountStatus, bankAccount.id];
    const updatedAccount = await database.queryOne(updateAccountQuery, arrayData);
    const statusResponse = await models.updatedAccountResPostgre(updatedAccount);
    return protocol.response(res, 200, 'data', statusResponse);
  }

  static deleteAccount(req, res) {
    if (!helpers.findById(userData.users.admins, req.headers, 'id', 'admin-id')) return protocol.response(res, 404, 'error', 'Admin not found, only registered admins can delete a bank account');
    const bankAccount = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    if (!bankAccount) return protocol.response(res, 404, 'error', 'Account number not found');
    accountData.accounts.splice(accountData.accounts.indexOf(bankAccount), 1);
    transactionData.transactions = transactionData.transactions.filter(
      transaction => transaction.accountNumber !== bankAccount.accountNumber,
    );
    return protocol.response(res, 200, 'message', 'Account successfully deleted');
  }
}
