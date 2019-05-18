import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';


export default class ValidateTransactionRequest {
  static transaction(req, res, next) {
    const { transactionAmount } = req.body;
    const cashierId = req.headers['cashier-id'];
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = checkRequest.validateNumber(transactionAmount, 'Transaction amount');
    const checkAccountNumber = checkRequest.validateNumber(accountNumber, 'Account number');
    const checkCashierId = checkRequest.validateNumber(cashierId, 'Cashier id');
    const findError = checkRequest.findError(checkTransactionAmount,
      checkAccountNumber, checkCashierId);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }
}
