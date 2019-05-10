import jwt from '../helpers/jwt';
import helpers from '../helpers/helper';
import queries from '../helpers/queries';
import database from '../db/pgConnect';

export default class Authenticate {
  static async authSignUp(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (checkUser) return helpers.response(res, 400, 'error', helpers.userExists('User'));
    return next();
  }

  static async authSignIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    this.checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!this.checkUser) return helpers.response(res, 404, 'error', helpers.userNotExists('User'));
    return next();
  }

  static async clients(req, res, next) {
    const findClientQuery = queries.findClientById();
    const token = req.headers['client-token'];
    if (!token) return helpers.response(res, 400, 'error', helpers.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    this.findClient = await database.queryOneORNone(findClientQuery, [verifyToken.userId]);
    if (!this.findClient) return helpers.response(res, 404, 'error', helpers.wrongToken());
    return next();
  }

  static async authCreateAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    const checkMasterAdmin = queries.findAdminById();
    const token = req.headers['master-admin-token'];
    if (!token) return helpers.response(res, 400, 'error', helpers.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const masterAdmin = await database.queryOneORNone(checkMasterAdmin, [verifyToken.userId]);
    if (!masterAdmin) return helpers.response(res, 404, 'error', 'Token does not match master admin');
    const checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (checkAdmin) return helpers.response(res, 404, 'error', helpers.userExists('Admin'));
    return next();
  }

  static async authSignInAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    this.checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (!this.checkAdmin) helpers.response(res, 404, 'error', helpers.userNotExists('Admin'));
    else next();
  }

  static async authUpdateAccountStatus(req, res, next) {
    const accountNumber = req.params.account_number;
    const verifyAccountQuery = queries.findAccountByNo();
    const findAdminQuery = queries.findAdminById();
    const token = req.headers['master-admin-token'] || req.headers['admin-token'];
    if (!token) return helpers.response(res, 400, 'error', helpers.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const findAdmin = await database.queryOneORNone(findAdminQuery, [verifyToken.userId]);
    if (!findAdmin) return helpers.response(res, 404, 'error', 'Token does not match any admin');
    this.bankAccount = await database.queryOneORNone(verifyAccountQuery, [accountNumber]);
    if (!this.bankAccount) return helpers.response(res, 404, 'error', 'Bank account not found');
    return next();
  }
}
