import models from '../models/users';
import database from '../db/pgConnect';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
import numbers from '../helpers/unique_no';
import authenticate from '../middleware/authenticate';
import hypertext from '../helpers/response';
import errors from '../helpers/errorMessage';

export default class Users {
  static async signUp(req, res) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const createUserQuery = 'INSERT INTO clients(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email';
    const hashedPassword = await password.hash(userPassword);
    const userId = await numbers.uniqueIds();
    const arrayData = [userId, userFirstName, userLastName, userEmail, hashedPassword];
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return hypertext.authResponse(res, 201, 'data', signUpRes, newToken, 'owner-id', newUser.id);
  }

  static async signIn(req, res) {
    const { userPassword } = req.body;
    const { checkUser } = authenticate;
    const verifyPassword = await password.compare(checkUser.password, userPassword);
    if (!verifyPassword) return hypertext.response(res, 400, 'error', errors.wrongPassword());
    const signInRes = await models.createUserDataResPostgre(checkUser);
    const newToken = await token.generate(checkUser.id);
    return hypertext.authResponse(res, 200, 'data', signInRes, newToken, 'owner-id', checkUser.id);
  }

  static async createAdmin(req, res) {
    const { userName, adminStaffPassword } = req.body;
    const adminId = numbers.uniqueIds();
    const hashedPassword = await password.hash(adminStaffPassword);
    const createAdminQuery = 'INSERT INTO admins(id, username, password) VALUES ($1, $2, $3) RETURNING id, username';
    const arrayData = [adminId, userName, hashedPassword];
    const createAdmin = await database.queryOne(createAdminQuery, arrayData);
    const newToken = await token.generate(createAdmin.id);
    return hypertext.authResponse(res, 201, 'data', createAdmin, newToken, 'admin-id', createAdmin.id);
  }

  static async signInAdmin(req, res) {
    const { checkAdmin } = authenticate;
    const { adminStaffPassword } = req.body;
    const verifyPassword = await password.compare(checkAdmin.password, adminStaffPassword);
    if (!verifyPassword) return hypertext.response(res, 400, 'error', errors.wrongPassword());
    const signInRes = await models.createAdminStaffDataResPostgre(checkAdmin);
    const newToken = await token.generate(checkAdmin.id);
    return hypertext.authResponse(res, 200, 'data', signInRes, newToken, 'admin-id', checkAdmin.id);
  }
}
