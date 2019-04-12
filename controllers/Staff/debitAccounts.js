// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.debitAccount = (req, res) => {
  if (!req.body.transactionAmount) return services.errorResponse(res, 400, 'Transaction amount is required');
  if (!services.checkNumber(req.body.transactionAmount)) return services.errorResponse(res, 400, 'Transaction amount must be numbers');
  if (!services.checkNumber(req.params.account_number)) return services.errorResponse(res, 400, 'Account number must be numbers');
  if (!req.headers['cashier-id']) return services.errorResponse(res, 400, 'Cashier id is required');
  if (!services.checkNumber(req.headers['cashier-id'])) return services.errorResponse(res, 400, 'Cashier id must be numbers');
  const findAccountNumber = services.findById(data.bankAccounts, req.params, 'accountNumber', 'account_number');
  const verifyCashier = services.findById(data.staff, req.headers, 'id', 'cashier-id');
  if (!findAccountNumber) return services.errorResponse(res, 404, 'Account number not found');
  if (!verifyCashier) return services.errorResponse(res, 404, 'Staff not found, only registered staff can debit or credit an bank account');
  req.params.accountBalance = findAccountNumber.balance;
  const newTransaction = data.debitAccountTransaction(req.body, req.params, req.headers);
  const responseTransaction = data.transactionResponse(newTransaction);
  findAccountNumber.balance -= req.body.transactionAmount;
  return services.successResponse(res, 201, responseTransaction);
};

export default logic.debitAccount;
