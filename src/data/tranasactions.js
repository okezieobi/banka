import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';


export default class ValidateTransactionRequest {
  static transaction(req, res, next) {
    const { transactionAmount } = req.body;
    const accountNumber = req.params.account_number;
    const checkTransactionAmount = checkRequest.validateNumber(transactionAmount, 'Transaction amount');
    const checkAccountNumber = checkRequest.validateInteger(accountNumber, 'Account number');
    const findError = checkRequest.findError(checkTransactionAmount,
      checkAccountNumber);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static getTransaction(req, res, next) {
    const transactionId = req.params.transaction_id;
    const checkTransactionId = checkRequest.validateInteger(transactionId, 'Transaction id');
    if (checkTransactionId) protocol.err400Res(res, checkTransactionId);
    else next();
  }
}
