import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';
import database from '../db/pgConnect';
import errors from '../helpers/errorMessage';
import test from '../helpers/regexTests';
import queries from '../helpers/queries';
import jwt from '../helpers/jwt';

export class ValidateUserInput {
  static signUp(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const firstNameErr = checkRequest.validateLetters(userFirstName, 'First name');
    const lastNameErr = checkRequest.validateLetters(userLastName, 'Last name');
    const emailErr = checkRequest.checkEmailFormat(userEmail, 'Email');
    const passwordErr = checkRequest.checkPassword(userPassword, 'Password');
    const findError = checkRequest.findError(firstNameErr, lastNameErr, emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }


  static signIn(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const emailErr = checkRequest.checkEmailFormat(userEmail, 'Email');
    const passwordErr = checkRequest.checkPassword(userPassword, 'Password');
    const findError = checkRequest.findError(emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static adminStaff(req, res, next) {
    const { userName, adminStaffPassword } = req.body;
    const usernameErr = checkRequest.validateUsername(userName, 'Username');
    const passwordErr = checkRequest.checkPassword(adminStaffPassword, 'Password');
    const findError = checkRequest.findError(usernameErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }
}


export class AuthenticateUsers {
  static async signUp(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (checkUser) return protocol.err400Res(res, errors.userExists('User'));
    return next();
  }

  static async signIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    this.checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!this.checkUser) return protocol.err404Res(res, errors.userNotExists('User'));
    return next();
  }

  static async clients(req, res, next) {
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

  static async signUpAdminStaff(req, res, next, findAdminStaffQuery, adminStaffTitle) {
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

  static signUpAdmin(req, res, next) {
    const signupAdmin = this.signUpAdminStaff(req, res, next, queries.findAdminByUsername(), 'Admin');
    return signupAdmin;
  }

  static async signUpStaff(req, res, next) {
    const signupStaff = this.signUpAdminStaff(req, res, next, queries.findStaffByUsername(), 'Staff');
    return signupStaff;
  }

  static async signInAdminStaff(req, res, next, findAdminStaffQuery, adminStaffTitle) {
    const { userName } = req.body;
    this.checkStaffAdmin = await database.queryOneORNone(findAdminStaffQuery, [userName]);
    if (!this.checkStaffAdmin) return protocol.err404Res(res, errors.userNotExists(`${adminStaffTitle}`));
    return next();
  }

  static signInAdmin(req, res, next) {
    const signinAdmin = this.signInAdminStaff(req, res, next, queries.findAdminByUsername(), 'Admin');
    return signinAdmin;
  }

  static authSignInStaff(req, res, next) {
    const signinStaff = this.signInAdminStaff(req, res, next, queries.findStaffByUsername(), 'Staff');
    return signinStaff;
  }

  static async admin(req, res, next) {
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
}
