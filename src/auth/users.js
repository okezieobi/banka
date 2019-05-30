import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errorMessage';
import test from '../helpers/regexTests';
import queries from '../helpers/queries';
import jwt from '../helpers/jwt';


export default class AuthenticateUsers {
  static async signUpAll(req, res, next, userData, findUserQuery, userTitle) {
    const data = req.body[userData];
    const checkUserQuery = queries[findUserQuery]();
    const user = await database.queryOneORNone(checkUserQuery, [data]);
    if (user) return protocol.err400Res(res, errors.userExists(`${userTitle}`));
    return next();
  }

  static signUp(req, res, next) {
    const signupClient = this.signUpAll(req, res, next, 'userEmail', 'findClientByEmail', 'User');
    return signupClient;
  }

  static signUpAdmin(req, res, next) {
    const signupAdmin = this.signUpAll(req, res, next, 'userName', 'findAdminByUsername', 'Admin');
    return signupAdmin;
  }

  static async signUpStaff(req, res, next) {
    const signupStaff = this.signUpAll(req, res, next, 'userName', 'findStaffByUsername', 'Staff');
    return signupStaff;
  }

  static async signInAll(req, res, next, query, title, data) {
    const userData = req.body[data];
    this.verifyUser = await database.queryOneORNone(queries[query](), [userData]);
    if (!this.verifyUser) return protocol.err404Res(res, errors.userNotExists(`${title}`));
    return next();
  }

  static signInAdmin(req, res, next) {
    const signinAdmin = this.signInAll(req, res, next, 'findAdminByUsername', 'Admin', 'userName');
    return signinAdmin;
  }

  static signInStaff(req, res, next) {
    const signinStaff = this.signInAll(req, res, next, 'findStaffByUsername', 'Staff', 'userName');
    return signinStaff;
  }

  static async signIn(req, res, next) {
    const signinClient = this.signInAll(req, res, next, 'findClientByEmail', 'User', 'userEmail');
    return signinClient;
  }

  static async authenticateAll(req, res, next, tokenTitle, query, title) {
    const token = req.headers[tokenTitle];
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    this.findUser = await database.queryOneORNone(queries[query](), [userId]);
    if (!this.findUser) return protocol.err404Res(res, errors.wrongToken([title]));
    return next();
  }

  static async clients(req, res, next) {
    const auth = this.authenticateAll(req, res, next, 'client-token', 'findClientById', 'user');
    return auth;
  }

  static async admin(req, res, next) {
    const auth = this.authenticateAll(req, res, next, 'admin-token', 'findAdminById', 'admin');
    return auth;
  }

  static async staff(req, res, next) {
    const auth = this.authenticateAll(req, res, next, 'staff-token', 'findStaffById', 'staff');
    return auth;
  }
}
