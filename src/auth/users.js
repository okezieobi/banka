import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errorMessage';
import test from '../helpers/regexTests';
import queries from '../helpers/queries';
import jwt from '../helpers/jwt';


export default class AuthenticateUsers {
  static async signUpAll(req, res, next, userData, findUserQuery, userTitle) {
    const user = await database.queryOneORNone(findUserQuery, [userData]);
    if (user) return protocol.err400Res(res, errors.userExists(`${userTitle}`));
    return next();
  }

  static signUp(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const signupClient = this.signUpAll(req, res, next, userEmail, checkUserQuery, 'User');
    return signupClient;
  }

  static signUpAdmin(req, res, next) {
    const { userName } = req.body;
    const findAdmin = queries.findAdminByUsername();
    const signupAdmin = this.signUpAll(req, res, next, userName, findAdmin, 'Admin');
    return signupAdmin;
  }

  static async signUpStaff(req, res, next) {
    const { userName } = req.body;
    const findStaff = queries.findStaffByUsername();
    const signupStaff = this.signUpAll(req, res, next, userName, findStaff, 'Staff');
    return signupStaff;
  }

  static async signInAll(req, res, next, query, title, data) {
    this.verifyUser = await database.queryOneORNone(query, [data]);
    if (!this.verifyUser) return protocol.err404Res(res, errors.userNotExists(`${title}`));
    return next();
  }

  static signInAdmin(req, res, next) {
    const findAdminQuery = queries.findAdminByUsername();
    const { userName } = req.body;
    const signinAdmin = this.signInAll(req, res, next, findAdminQuery, 'Admin', userName);
    return signinAdmin;
  }

  static signInStaff(req, res, next) {
    const findStaffQuery = queries.findStaffByUsername();
    const { userName } = req.body;
    const signinStaff = this.signInAll(req, res, next, findStaffQuery, 'Staff', userName);
    return signinStaff;
  }

  static async signIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const signinClient = this.signInAll(req, res, next, checkUserQuery, 'User', userEmail);
    return signinClient;
  }

  static async authenticateAll(req, res, next, token, query, title) {
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    this.findUser = await database.queryOneORNone(query, [userId]);
    if (!this.findUser) return protocol.err404Res(res, errors.wrongToken([title]));
    return next();
  }

  static async clients(req, res, next) {
    const findClientQuery = queries.findClientById();
    const token = req.headers['client-token'];
    const auth = this.authenticateAll(req, res, next, token, findClientQuery, 'user');
    return auth;
  }

  static async admin(req, res, next) {
    const findAdminQuery = queries.findAdminById();
    const token = req.headers['admin-token'];
    const auth = this.authenticateAll(req, res, next, token, findAdminQuery, 'admin');
    return auth;
  }

  static async staff(req, res, next) {
    const findStaffQuery = queries.findStaffById();
    const token = req.headers['staff-token'];
    const auth = this.authenticateAll(req, res, next, token, findStaffQuery, 'staff');
    return auth;
  }
}
