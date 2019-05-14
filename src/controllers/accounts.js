import accountData from '../db/accounts';
import userData from '../db/users';
import helpers from '../helpers/searchArray';
import models from '../models/accounts';
import transactionData from '../db/transactions';
import database from '../db/pgConnect';
import authenticate from '../middleware/authenticate';
import protocol from '../helpers/response';

export default class Accounts {
  static async createAccount(req, res) {
    const reqData = await models.bankAccountPostgre(req.body);
    const { id, accountNumber, type } = reqData;
    const { findClient } = authenticate;
    const createAccountQuery = 'INSERT INTO accounts(id, number, owner, type) VALUES ($1, $2, $3, $4) RETURNING *';
    const arrayData = [id, accountNumber, findClient.id, type];
    const newBankAccount = await database.queryOne(createAccountQuery, arrayData);
    const bankAccountRes = await models.createBankAccountResPostgre(newBankAccount, findClient);
    return protocol.success201Res(res, bankAccountRes);
  }

  static async updateStatus(req, res) {
    const { bankAccount } = authenticate;
    const { accountStatus } = req.body;
    if ((bankAccount.status).toLowerCase() === (accountStatus).toLowerCase()) return protocol.err400Res(res, `Account status is already ${accountStatus}`);
    const updateAccountQuery = 'UPDATE accounts SET status = $1 WHERE id = $2 RETURNING *';
    const arrayData = [accountStatus, bankAccount.id];
    const updatedAccount = await database.queryOne(updateAccountQuery, arrayData);
    const statusResponse = await models.updatedAccountResPostgre(updatedAccount);
    return protocol.success200Res(res, statusResponse);
  }

  static deleteAccount(req, res) {
    if (!helpers.findById(userData.users.admins, req.headers, 'id', 'admin-id')) return protocol.err404Res(res, 'Admin not found, only registered admins can delete a bank account');
    const bankAccount = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    if (!bankAccount) return protocol.err404Res(res, 'Account number not found');
    accountData.accounts.splice(accountData.accounts.indexOf(bankAccount), 1);
    transactionData.transactions = transactionData.transactions.filter(
      transaction => transaction.accountNumber !== bankAccount.accountNumber,
    );
    return protocol.success200ResMessage(res, 'Account successfully deleted');
  }
}
