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

  static async authSigninAll(req, res, next, requestData, findUserQuery, errMessage) {
    this.verifyUser = await database.queryOneORNone(findUserQuery, [requestData]);
    if (this.verifyUser) return protocol.err404Res(res, errMessage);
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

  static async authSignupAdminStaff(req, res, next, findAdminStaffQuery, adminStaffTitle) {
    const { userName } = req.body;
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
    const checkStaffAdmin = await database.queryOneORNone(findAdminStaffQuery, [userName]);
    if (checkStaffAdmin) return protocol.err404Res(res, errors.userExists(`${adminStaffTitle}`));
    return next();
  }

  static authSignUpAdmin(req, res, next) {
    const signupAdmin = this.authSignupAdminStaff(req, res, next, queries.findAdminByUsername(), 'Admin');
    return signupAdmin;
  }

  static async authSignUpStaff(req, res, next) {
    const signupStaff = this.authSignupAdminStaff(req, res, next, queries.findStaffByUsername(), 'Staff');
    return signupStaff;
  }

  static async authSigninAdminStaff(req, res, next, findAdminStaffQuery, adminStaffTitle) {
    const { userName } = req.body;
    this.checkStaffAdmin = await database.queryOneORNone(findAdminStaffQuery, [userName]);
    if (!this.checkStaffAdmin) return protocol.err404Res(res, errors.userNotExists(`${adminStaffTitle}`));
    return next();
  }

  static authSignInAdmin(req, res, next) {
    const signinAdmin = this.authSigninAdminStaff(req, res, next, queries.findAdminByUsername(), 'Admin');
    return signinAdmin;
  }

  static authSignInStaff(req, res, next) {
    const signinStaff = this.authSigninAdminStaff(req, res, next, queries.findStaffByUsername(), 'Staff');
    return signinStaff;
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
