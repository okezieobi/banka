import models from '../models/accounts';
import database from '../db/pgConnect';
import authenticateUsers from '../auth/users';
import AuthenticateAccount from '../auth/accounts';
import protocol from '../helpers/response';
import queries from '../helpers/queries';

export default class Accounts {
  static async createAccount(req, res) {
    const reqData = await models.bankAccountPostgre(req.body);
    const { id, accountNumber, type } = reqData;
    const { findUser } = authenticateUsers;
    const createAccountQuery = queries.createAccount();
    const arrayData = [id, accountNumber, findUser.id, type];
    const newBankAccount = await database.queryOne(createAccountQuery, arrayData);
    const bankAccountRes = await models.createBankAccountResPostgre(newBankAccount, findUser);
    return protocol.success201Res(res, bankAccountRes);
  }

  static async updateStatus(req, res) {
    const { bankAccount } = AuthenticateAccount;
    const { accountStatus } = req.body;
    if ((bankAccount.status).toLowerCase() === (accountStatus).toLowerCase()) return protocol.err400Res(res, `Account status is already ${accountStatus}`);
    const updateAccountQuery = queries.updateAccount();
    const arrayData = [accountStatus, bankAccount.id];
    const updatedAccount = await database.queryOne(updateAccountQuery, arrayData);
    const statusResponse = await models.updatedAccountResPostgre(updatedAccount);
    return protocol.success200Res(res, statusResponse);
  }

  static async deleteAccount(req, res) {
    const { bankAccount } = AuthenticateAccount;
    const { id, status } = bankAccount;
    if (status === 'Active' || status === 'active') return protocol.err400Res(res, 'Only dormant accounts can be deleted, please update account status');
    const deleteAccountQuery = queries.deleteAccount();
    await database.queryNone(deleteAccountQuery, [id]);
    return protocol.success200ResMessage(res, 'Account successfully deleted');
  }

  static async getAccountHistory(req, res) {
    const { bankAccount } = AuthenticateAccount;
    const { number } = bankAccount;
    const getAccountHistoryQuery = queries.getAccountHistory();
    const accountHistory = await database.queryAny(getAccountHistoryQuery, [number]);
    const responseData = await models.getTransactions(accountHistory);
    return protocol.success200Res(res, responseData);
  }
}
