// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.toggleAccountState = (req, res) => {
  if (!services.findById(data.admins, req.headers, 'id', 'admin-id')) return services.errorResponse(res, 404, 'Admin id not found, only registered admins can update an account detail');
  const bankAccount = services.findById(data.bankAccounts, req.params, 'accountNumber', 'account_number');
  if (!bankAccount) return services.errorResponse(res, 404, 'Account number not found');
  if ((bankAccount.status).toLowerCase() === (req.body.accountStatus).toLowerCase()) return services.errorResponse(res, 400, `Account status is already ${req.body.accountStatus}`);
  bankAccount.status = req.body.accountStatus;
  const statusResponse = data.updateAccountStatus(bankAccount);
  return services.successResponse(res, 200, statusResponse);
};

export default logic.toggleAccountState;
