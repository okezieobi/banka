import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';


export default class ValidateTransactionRequest {
  static transaction(req, res, next) {
    const { transactionAmount } = req.body;
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = checkRequest.validateNumber(transactionAmount, 'Transaction amount');
    const checkAccountNumber = checkRequest.validateNumber(accountNumber, 'Account number');
    const findError = checkRequest.findError(checkTransactionAmount,
      checkAccountNumber);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }
}
