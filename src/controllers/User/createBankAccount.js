// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.createBankAccount = (req, res) => {
  const findUser = services.findById(data.users, req.headers, 'id', 'owner-id');
  if (!findUser) return services.errorResponse(res, 400, 'Only registered users can create bank accounts, please sign up');
  const newBankAccount = data.bankAccount(req.body);
  const bankAccountRes = data.createBankAccountResponse(newBankAccount, findUser);
  return services.successResponse(res, 201, bankAccountRes);
};

export default logic.createBankAccount;
