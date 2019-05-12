import jwt from '../helpers/jwt';
import queries from '../helpers/queries';
import database from '../db/pgConnect';
import protocol from '../helpers/response';
import errors from '../helpers/errorMessage';
import test from '../helpers/regexTests';

export default class Authenticate {
  static async authSignUp(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (checkUser) return protocol.response(res, 400, 'error', errors.userExists('User'));
    return next();
  }

  static async authSignIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    this.checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!this.checkUser) return protocol.response(res, 404, 'error', errors.userNotExists('User'));
    return next();
  }

  static async clients(req, res, next) {
    const findClientQuery = queries.findClientById();
    const token = req.headers['client-token'];
    if (!token) return protocol.response(res, 400, 'error', errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.response(res, 400, 'error', errors.invalidToken());
    this.findClient = await database.queryOneORNone(findClientQuery, [userId]);
    if (!this.findClient) return protocol.response(res, 404, 'error', errors.wrongToken());
    return next();
  }

  static async authCreateAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    const checkMasterAdmin = queries.findAdminById();
    const token = req.headers['admin-token']; // master admin
    if (!token) return protocol.response(res, 400, 'error', errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.response(res, 400, 'error', errors.invalidToken());
    const masterAdmin = await database.queryOneORNone(checkMasterAdmin, [userId]);
    if (!masterAdmin) return protocol.response(res, 404, 'error', 'Token does not match master admin');
    const checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (checkAdmin) return protocol.response(res, 404, 'error', errors.userExists('Admin'));
    return next();
  }

  static async authSignInAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    this.checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (!this.checkAdmin) protocol.response(res, 404, 'error', errors.userNotExists('Admin'));
    else next();
  }

  static async authSignInStaff(req, res, next) {
    const { userName } = req.body;
    const checkStaffQuery = queries.findStaffByUsername();
    this.checkStaff = await database.queryOneORNone(checkStaffQuery, [userName]);
    if (!this.checkStaff) protocol.response(res, 404, 'error', errors.userNotExists('Staff'));
    else next();
  }

  static async authUpdateAccountStatus(req, res, next) {
    const accountNumber = req.params.account_number;
    const verifyAccountQuery = queries.findAccountByNo();
    const findAdminQuery = queries.findAdminById();
    const token = req.headers['admin-token'];
    if (!token) return protocol.response(res, 400, 'error', errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.response(res, 400, 'error', errors.invalidToken());
    const findAdmin = await database.queryOneORNone(findAdminQuery, [userId]);
    if (!findAdmin) return protocol.response(res, 404, 'error', 'Token does not match any admin');
    this.bankAccount = await database.queryOneORNone(verifyAccountQuery, [accountNumber]);
    if (!this.bankAccount) return protocol.response(res, 404, 'error', 'Bank account not found');
    return next();
  }
}
