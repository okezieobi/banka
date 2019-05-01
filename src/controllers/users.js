import data from '../db/users';
import helpers from '../helpers/helper';
import models from '../models/users';
import database from '../helpers/queries';
import password from '../helpers/bcrypt';
import token from '../helpers/jwt';

export default class Users {
  static async signUp(req, res) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const checkUserQuery = 'SELECT * FROM clients WHERE email = $1';
    const checkUser = await database.query(checkUserQuery, [userEmail]);
    if (checkUser) return helpers.response(res, 400, 'error', 'User exists, please sign in');
    const createUserQuery = 'INSERT INTO clients(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email';
    const hashedPassword = await password.hash(userPassword);
    const arrayData = [userFirstName, userLastName, userEmail, hashedPassword];
    const newUser = await database.query(createUserQuery, arrayData);
    const signUpRes = models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser);
    // @ts-ignore
    return helpers.authResponse(res, 201, 'data', signUpRes, newToken, 'owner-id', newUser.id);
  }

  static signIn(req, res) {
    const registeredUser = helpers.findByValue(data.users.clients, req.body, 'email', 'userEmail');
    if (!registeredUser) return helpers.response(res, 404, 'error', 'User does not exist, please sign up');
    if (registeredUser.password !== req.body.userPassword) return helpers.response(res, 400, 'error', 'Password does not match user');
    const responseUserData = models.createUserDataResponse(registeredUser);
    return helpers.response(res, 200, 'data', responseUserData);
  }
}
