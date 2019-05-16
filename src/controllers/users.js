import database from '../db/pgConnect';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
import authenticate from '../middleware/authenticate';
import protocol from '../helpers/response';
import errors from '../helpers/errorMessage';
import models from '../models/users';
import queries from '../helpers/queries';

export default class Users {
  static async signUp(req, res) {
    const reqData = await models.userDataPostgre(req.body);
    const {
      id, firstName, lastName, email, hashedPassword,
    } = reqData;
    const createUserQuery = queries.createClient();
    const arrayData = [id, firstName, lastName, email, hashedPassword];
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }

  static async signIn(req, res) {
    const { userPassword } = req.body;
    const { checkUser } = authenticate;
    const verifyPassword = await password.compare(checkUser.password, userPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await models.createUserDataResPostgre(checkUser);
    const newToken = await token.generate(checkUser.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }

  static async signupAdminStaff(req, res, signupQuery) {
    const reqData = await models.adminStaffDataPostgre(req.body);
    const { id, username, hashedPassword } = reqData;
    const arrayData = [id, username, hashedPassword];
    const createAdminStaff = await database.queryOne(signupQuery, arrayData);
    const newToken = await token.generate(createAdminStaff.id);
    return protocol.auth201Res(res, createAdminStaff, newToken);
  }

  static signUpAdmin(req, res) {
    const signup = Users.signupAdminStaff(req, res, queries.createAdmin());
    return signup;
  }

  static async signUpStaff(req, res) {
    const signupStaff = Users.signupAdminStaff(req, res, queries.createStaff());
    return signupStaff;
  }

  static async signinAdminStaff(req, res) {
    const { checkStaffAdmin } = authenticate;
    const { adminStaffPassword } = req.body;
    const verifyPassword = await password.compare(checkStaffAdmin.password, adminStaffPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await models.createAdminStaffDataResPostgre(checkStaffAdmin);
    const newToken = await token.generate(checkStaffAdmin.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }
}
