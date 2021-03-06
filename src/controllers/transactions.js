import models from '../models/transactions';
import protocol from '../helpers/response';
import queries from '../helpers/queries';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import database from '../db/pgConnect';
import errors from '../helpers/errorMessage';

export default class Transactions {
  static async transact(req, res, modelData) {
    const { transactionAmount } = req.body;
    const { bankAccount } = authenticateAccount;
    const { findUser } = authenticateUsers;
    const { id } = findUser;
    const queryData = modelData(transactionAmount, bankAccount, id);
    const {
      transactionId, type, accountNumber, cashier, amount, oldBalance, newBalance,
    } = queryData;
    const transactionArrayData = [transactionId, type, accountNumber,
      cashier, amount, oldBalance, newBalance];
    const updateAccountData = [newBalance, bankAccount.id];
    const transactionQuery = await queries.transaction(database.pool,
      transactionArrayData, updateAccountData);
    const transactionResponse = models.transactionResPostgre(transactionQuery);
    return protocol.success201Res(res, transactionResponse);
  }

  static debitAccount(req, res) {
    const debit = this.transact(req, res, models.debitAccountPostgre.bind(models));
    return debit;
  }

  static creditAccount(req, res) {
    const credit = this.transact(req, res, models.creditAccountPostgre.bind(models));
    return credit;
  }

  static async getTransaction(req, res) {
    const transactionId = req.params.transaction_id;
    const findTransactionQuery = queries.getTransaction();
    const transaction = await database.queryOneORNone(findTransactionQuery, [transactionId]);
    if (!transaction) return protocol.err404Res(res, errors.transactionNotFound());
    const transactionRes = await models.getTransaction(transaction);
    return protocol.success200Res(res, transactionRes);
  }
}
