// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.createBankAccount = (req, res) => {
  if (!req.body.ownerId) return services.errorResponse(res, 400, 'User Id is required');
  if (!services.checkNumber(req.body.ownerId)) return services.errorResponse(res, 400, 'User id must be numbers');
  if (!req.body.bankAccountType) return services.errorResponse(res, 400, 'Bank account type is required');
  if (!services.checkName(req.body.bankAccountType)) return services.errorResponse(res, 400, 'Bank account type must be letters');
  if (req.body.bankAccountType !== 'current' && req.body.bankAccountType !== 'savings'
    && req.body.bankAccountType !== 'Current' && req.body.bankAccountType !== 'Savings') return services.errorResponse(res, 400, 'Bank account type must be savings or current');
  const findUser = services.findOne(data.users, req.body, 'id', 'ownerId');
  if (!findUser) return services.errorResponse(res, 400, 'Only users can create bank accounts, please sign up');
  const newBankAccount = data.bankAccount(req.body);
  const bankAccountRes = data.createBankAccountResponse(newBankAccount, findUser);
  return services.successResponse(res, 201, bankAccountRes);
};

export default logic.createBankAccount;
