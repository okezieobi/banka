import accountData from '../db/accounts';
import helpers from '../helpers/searchArray';
import models from '../models/transactions';
import transactionData from '../db/transactions';
import userData from '../db/users';
import hypertext from '../helpers/response';

export default class Transactions {
  static debitAccount(req, res) {
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return hypertext.response(res, 404, 'error', 'Account number not found');
    if (findAccountNumber.balance < req.body.transactionAmount) return hypertext.response(res, 400, 'error', 'Insufficient balance');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return hypertext.response(res, 400, 'error', 'Only active accounts can be debited');
    if (!verifyCashier) return hypertext.response(res, 404, 'error', 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.debitAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance -= parseFloat(req.body.transactionAmount);
    return hypertext.response(res, 201, 'data', responseTransaction);
  }

  static creditAccount(req, res) {
    const findAccountNumber = helpers.findById(accountData.accounts, req.params, 'accountNumber', 'account_number');
    const verifyCashier = helpers.findById(userData.users.staff, req.headers, 'id', 'cashier-id');
    if (!findAccountNumber) return hypertext.response(res, 404, 'error', 'Account number not found');
    if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return hypertext.response(res, 400, 'error', 'Only active accounts can be credited');
    if (!verifyCashier) return hypertext.response(res, 404, 'error', 'Staff not found, only registered staff can debit or credit a bank account');
    req.params.accountBalance = findAccountNumber.balance;
    const newTransaction = models.creditAccountTransaction(req.body, req.params, req.headers);
    transactionData.transactions.push(newTransaction);
    const responseTransaction = models.transactionResponse(newTransaction);
    findAccountNumber.balance += parseFloat(req.body.transactionAmount);
    return hypertext.response(res, 201, 'data', responseTransaction);
  }
}
