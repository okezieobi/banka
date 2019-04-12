// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.deleteAccount = (req, res) => {
  if (!req.headers['admin-id']) return services.errorResponse(res, 400, 'Admin id is required');
  if (!services.checkNumber(req.headers['admin-id'])) return services.errorResponse(res, 400, 'Admin id must be numbers');
  if (!services.findById(data.admins, req.headers, 'id', 'admin-id')) return services.errorResponse(res, 404, 'Admin not found, only registered admins can delete a bank account');
  if (!services.checkNumber(req.params.account_number)) return services.errorResponse(res, 400, 'Account number must be numbers');
  const bankAccount = services.findById(data.bankAccounts, req.params, 'accountNumber', 'account_number');
  if (!bankAccount) return services.errorResponse(res, 404, 'Account number not found');
  data.bankAccounts.splice(data.bankAccounts.indexOf(bankAccount), 1);
  data.transactions = data.transactions.filter(
    transaction => transaction.accountNumber !== bankAccount.accountNumber,
  );
  return services.successResMessage(res, 200, 'Account successfully deleted');
};

export default logic.deleteAccount;
