import authenticateAccount from './accounts';
import errors from '../helpers/errorMessage';
import protocol from '../helpers/response';

export default class AuthenticateTransaction {
  static authBankAccount() {
    const { bankAccount } = authenticateAccount;
    return bankAccount;
  }

  static async accountStatus(req, res, next, title) {
    const { status } = this.authBankAccount();
    if (status !== 'Active' && status !== 'active') protocol.err400Res(res, errors.statusMustBeActive(title));
    else next();
  }

  static accountStatusDebit(req, res, next) {
    const debitStatus = this.accountStatus(req, res, next, 'debited');
    return debitStatus;
  }

  static accountStatusCredit(req, res, next) {
    const creditStatus = this.accountStatus(req, res, next, 'credited');
    return creditStatus;
  }

  static accountBalance(req, res, next) {
    const { transactionAmount } = req.body;
    const { balance } = this.authBankAccount();
    if (balance < transactionAmount) protocol.err400Res(res, errors.insufficientBalance());
    else next();
  }
}
