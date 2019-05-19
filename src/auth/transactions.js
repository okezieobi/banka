import authenticateAccount from './accounts';
import errors from '../helpers/errorMessage';
import protocol from '../helpers/response';

export default class AuthenticateTransaction {
  static authBankAccount() {
    const { bankAccount } = authenticateAccount;
    return bankAccount;
  }

  static async accountStatus(req, res, next) {
    const { status } = this.authBankAccount();
    if (status !== 'Active' && status !== 'active') protocol.err400Res(res, errors.statusMustBeActive());
    else next();
  }

  static accountBalance(req, res, next) {
    const { transactionAmount } = req.body;
    const { balance } = this.authBankAccount();
    if (balance < transactionAmount) protocol.err400Res(res, errors.insufficientBalance());
    else next();
  }
}
