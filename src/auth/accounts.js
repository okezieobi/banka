import protocol from '../helpers/response';
import database from '../db/pgConnect';
import queries from '../helpers/queries';

export default class AuthenticateAccount {
  static async account(req, res, next) {
    const accountNumber = req.params.account_number;
    const verifyAccountQuery = queries.findAccountByNo();
    this.bankAccount = await database.queryOneORNone(verifyAccountQuery, [accountNumber]);
    if (!this.bankAccount) return protocol.err404Res(res, 'Bank account not found');
    return next();
  }
}
