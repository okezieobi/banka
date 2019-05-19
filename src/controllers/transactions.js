import accountData from '../db/accounts';
import helpers from '../helpers/searchArray';
import models from '../models/transactions';
import transactionData from '../db/transactions';
import userData from '../db/users';
import protocol from '../helpers/response';
import queries from '../helpers/queries';
import authenticateAccount from '../auth/accounts';
import authenticateUsers from '../auth/users';
import database from '../db/pgConnect';

export default class Transactions {
  static debitAccount(req, res) {
    const { transactionAmount } = req.body;
    const { bankAccount } = authenticateAccount;
    const { staffUser } = authenticateUsers;
    const { id } = staffUser;
    const queryData = models.debitAccountPostgre(transactionAmount, bankAccount, id);
    const {
      transactionId, type, accountNumber, cashier, amount, oldBalance, newBalance,
    } = queryData;
    const transactionArrayData = [transactionId, type, accountNumber, cashier, amount, oldBalance, newBalance];
    const updateAccountData = [newBalance, bankAccount.id];
    const transactionQuery = queries.transaction(database, transactionArrayData, updateAccountData);
    const transactionResponse = models.transactionResPostgre(transactionQuery);
    return protocol.success201Res(res, transactionResponse);
    /*
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return protocol.response(res, 404, 'error', 'Account number not found');
    if (findAccountNumber.balance < req.body.transactionAmount) return protocol.response(res, 400, 'error', 'Insufficient balance');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return protocol.response(res, 400, 'error', 'Only active accounts can be debited');
    if (!verifyCashier) return protocol.response(res, 404, 'error', 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.debitAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance -= parseFloat(req.body.transactionAmount);
    return protocol.response(res, 201, 'data', responseTransaction);
    */
  }

  static creditAccount(req, res) {
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return protocol.response(res, 404, 'error', 'Account number not found');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return protocol.response(res, 400, 'error', 'Only active accounts can be credited');
    if (!verifyCashier) return protocol.response(res, 404, 'error', 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.creditAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance += parseFloat(req.body.transactionAmount);
    return protocol.response(res, 201, 'data', responseTransaction);
  }
}
