import database from '../db/pgConnect';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
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

  static async signinAll(req, res, userPassword, model) {
    const { verifyUser } = authenticateUsers;
    const verifyPassword = await password.compare(verifyUser.password, userPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await model(verifyUser);
    const newToken = await token.generate(verifyUser.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }

  static async signinClients(req, res) {
    const { userPassword } = req.body;
    const userModel = models.createUserDataResPostgre;
    const signin = this.signinAll(req, res, userPassword, userModel);
    return signin;
  }

  static async signinAdminStaff(req, res) {
    const { adminStaffPassword } = req.body;
    const adminStaffModel = models.createAdminStaffDataResPostgre;
    const signin = this.signinAll(req, res, adminStaffPassword, adminStaffModel);
    return signin;
  }

  static async signupAdminStaff(req, res, signupQuery) {
    const reqData = await models.adminStaffDataPostgre(req.body);
    const { id, username, hashedPassword } = reqData;
    const arrayData = [id, username, hashedPassword];
    const createAdminStaff = await database.queryOne(signupQuery, arrayData);
    const signupRes = await models.createAdminStaffDataResPostgre(createAdminStaff);
    const newToken = await token.generate(createAdminStaff.id);
    return protocol.auth201Res(res, signupRes, newToken);
  }

  static signUpAdmin(req, res) {
    const signup = this.signupAdminStaff(req, res, queries.createAdmin());
    return signup;
  }

  static async signUpStaff(req, res) {
    const signupStaff = this.signupAdminStaff(req, res, queries.createStaff());
    return signupStaff;
  }
}
