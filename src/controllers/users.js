import database from '../db/pgConnect';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
import authenticate from '../middleware/authenticate';
import protocol from '../helpers/response';
import errors from '../helpers/errorMessage';
import models from '../models/users';

export default class Users {
  static async signUp(req, res) {
    const reqData = await models.userDataPostgre(req.body);
    const {
      id, firstName, lastName, email, hashedPassword,
    } = reqData;
    const createUserQuery = 'INSERT INTO clients(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, type';
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

  static async signUpAdmin(req, res) {
    const reqData = await models.adminStaffDataPostgre(req.body);
    const { id, username, hashedPassword } = reqData;
    const createAdminQuery = 'INSERT INTO admins(id, username, password) VALUES ($1, $2, $3) RETURNING id, username, type';
    const arrayData = [id, username, hashedPassword];
    const createAdmin = await database.queryOne(createAdminQuery, arrayData);
    const newToken = await token.generate(createAdmin.id);
    return protocol.auth201Res(res, createAdmin, newToken);
  }

  static async signInAdmin(req, res) {
    const { checkAdmin } = authenticate;
    const { adminStaffPassword } = req.body;
    const verifyPassword = await password.compare(checkAdmin.password, adminStaffPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await models.createAdminStaffDataResPostgre(checkAdmin);
    const newToken = await token.generate(checkAdmin.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }

  static async signUpStaff(req, res) {
    const reqData = await models.adminStaffDataPostgre(req.body);
    const { id, username, hashedPassword } = reqData;
    const createStaffQuery = 'INSERT INTO staff(id, username, password) VALUES ($1, $2, $3) RETURNING id, username, type';
    const arrayData = [id, username, hashedPassword];
    const createStaff = await database.queryOne(createStaffQuery, arrayData);
    const newToken = await token.generate(createStaff.id);
    return protocol.auth201Res(res, createStaff, newToken);
  }

  static async signinStaff(req, res) {
    const { checkStaff } = authenticate;
    const { adminStaffPassword } = req.body;
    const verifyPassword = await password.compare(checkStaff.password, adminStaffPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await models.createAdminStaffDataResPostgre(checkStaff);
    const newToken = await token.generate(checkStaff.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }
}
