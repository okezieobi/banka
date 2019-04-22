import accountData from '../db/accounts';
import helpers from '../helpers/helper';
import models from '../models/transactions';
import transactionData from '../db/transactions';
import userData from '../db/users';

export default class Transactions {
  static debitAccount(req, res) {
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return helpers.errorResponse(res, 404, 'Account number not found');
    if (findAccountNumber.balance < req.body.transactionAmount) return helpers.errorResponse(res, 400, 'Insufficient balance');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return helpers.errorResponse(res, 400, 'Only active accounts can be debited');
    if (!verifyCashier) return helpers.errorResponse(res, 404, 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.debitAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance -= parseFloat(req.body.transactionAmount);
    return helpers.successResponse(res, 201, responseTransaction);
  }

  static creditAccount(req, res) {
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return helpers.errorResponse(res, 404, 'Account number not found');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return helpers.errorResponse(res, 400, 'Only active accounts can be credited');
    if (!verifyCashier) return helpers.errorResponse(res, 404, 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.creditAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance += parseFloat(req.body.transactionAmount);
    return helpers.successResponse(res, 201, responseTransaction);
  }
}
