import helpers from '../helpers/helper';
import models from '../models/users';
import database from '../db/pgConnect';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
import numbers from '../helpers/unique_no';

export default class Users {
  static async signUp(req, res) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const checkUserQuery = 'SELECT * FROM clients WHERE email = $1';
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (checkUser) return helpers.response(res, 400, 'error', 'User exists, please sign in');
    const createUserQuery = 'INSERT INTO clients(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email';
    const hashedPassword = await password.hash(userPassword);
    const userId = await numbers.uniqueIds();
    const arrayData = [userId, userFirstName, userLastName, userEmail, hashedPassword];
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser);
    return helpers.authResponse(res, 201, 'data', signUpRes, newToken, 'owner-id', newUser.id);
  }

  static async signIn(req, res) {
    const { userEmail, userPassword } = req.body;
    const checkUserQuery = 'SELECT * FROM clients WHERE email = $1';
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!checkUser) return helpers.response(res, 404, 'error', 'User does not exist, please sign up');
    const verifyPassword = password.compare(checkUser.password, userPassword);
    if (!verifyPassword) return helpers.response(res, 400, 'error', 'Password does not match user');
    const signInRes = models.createUserDataResPostgre(checkUser);
    const newToken = await token.generate(checkUser);
    return helpers.authResponse(res, 200, 'data', signInRes, newToken, 'owner-id', checkUser.id);
  }
}
