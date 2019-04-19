// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.creditAccount = (req, res) => {
  const findAccountNumber = services.findById(data.bankAccounts, req.params, 'accountNumber', 'account_number');
  const verifyCashier = services.findById(data.staff, req.headers, 'id', 'cashier-id');
  if (!findAccountNumber) return services.errorResponse(res, 404, 'Account number not found');
  if (findAccountNumber.status !== 'Active' && findAccountNumber.status !== 'active') return services.errorResponse(res, 400, 'Only active accounts can be credited');
  if (!verifyCashier) return services.errorResponse(res, 404, 'Staff not found, only registered staff can debit or credit a bank account');
  req.params.accountBalance = findAccountNumber.balance;
  const newTransaction = data.creditAccountTransaction(req.body, req.params, req.headers);
  const responseTransaction = data.transactionResponse(newTransaction);
  findAccountNumber.balance += parseFloat(req.body.transactionAmount);
  return services.successResponse(res, 201, responseTransaction);
};

export default logic.creditAccount;