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
    if (checkUser) return protocol.err400Res(res, errors.userExists('User'));
    return next();
  }

  static async authSignIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    this.checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!this.checkUser) return protocol.err404Res(res, errors.userNotExists('User'));
    return next();
  }

  static async authClients(req, res, next) {
    const findClientQuery = queries.findClientById();
    const token = req.headers['client-token'];
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    this.findClient = await database.queryOneORNone(findClientQuery, [userId]);
    if (!this.findClient) return protocol.err404Res(res, errors.wrongToken());
    return next();
  }

  static async authSignUpAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    const checkMasterAdmin = queries.findAdminById();
    const token = req.headers['admin-token']; // master admin
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    const masterAdmin = await database.queryOneORNone(checkMasterAdmin, [userId]);
    if (!masterAdmin) return protocol.err404Res(res, 'Token does not match master admin');
    const checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (checkAdmin) return protocol.err404Res(res, errors.userExists('Admin'));
    return next();
  }

  static async authSignUpStaff(req, res, next) {
    const { userName } = req.body;
    const checkStaffQuery = queries.findStaffByUsername();
    const checkMasterAdmin = queries.findAdminById();
    const token = req.headers['admin-token']; // master admin
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    const masterAdmin = await database.queryOneORNone(checkMasterAdmin, [userId]);
    if (!masterAdmin) return protocol.err404Res(res, 'Token does not match master admin');
    const checkStaff = await database.queryOneORNone(checkStaffQuery, [userName]);
    if (checkStaff) return protocol.err404Res(res, errors.userExists('Staff'));
    return next();
  }

  static async authSignInAdmin(req, res, next) {
    const { userName } = req.body;
    const checkAdminQuery = queries.findAdminByUsername();
    this.checkAdmin = await database.queryOneORNone(checkAdminQuery, [userName]);
    if (!this.checkAdmin) protocol.err404Res(res, errors.userNotExists('Admin'));
    else next();
  }

  static async authSignInStaff(req, res, next) {
    const { userName } = req.body;
    const checkStaffQuery = queries.findStaffByUsername();
    this.checkStaff = await database.queryOneORNone(checkStaffQuery, [userName]);
    if (!this.checkStaff) protocol.err404Res(res, errors.userNotExists('Staff'));
    else next();
  }

  static async authAdmins(req, res, next) {
    const findAdminQuery = queries.findAdminById();
    const token = req.headers['admin-token'];
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkNumber(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    const findAdmin = await database.queryOneORNone(findAdminQuery, [userId]);
    if (!findAdmin) return protocol.err404Res(res, 'Token does not match any admin');
    return next();
  }

  static async verifyAccount(req, res, next) {
    const accountNumber = req.params.account_number;
    const verifyAccountQuery = queries.findAccountByNo();
    this.bankAccount = await database.queryOneORNone(verifyAccountQuery, [accountNumber]);
    if (!this.bankAccount) return protocol.err404Res(res, 'Bank account not found');
    return next();
  }
}
