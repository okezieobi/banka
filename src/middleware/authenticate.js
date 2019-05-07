import jwt from '../helpers/jwt';
import helpers from '../helpers/helper';
import queries from '../helpers/queries';
import database from '../db/pgConnect';

export default class Authenticate {
  static async authSignUp(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    const checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (checkUser) return helpers.response(res, 400, 'error', 'User exists, please sign in');
    return next();
  }

  static async authSignIn(req, res, next) {
    const { userEmail } = req.body;
    const checkUserQuery = queries.findClientByEmail();
    this.checkUser = await database.queryOneORNone(checkUserQuery, [userEmail]);
    if (!this.checkUser) return helpers.response(res, 404, 'error', 'User does not exist, please sign up');
    return next();
  }

  static async clients(req, res, next) {
    const token = req.headers['client-token'];
    const findClientQuery = queries.findClientById();
    if (!token) return helpers.response(res, 400, 'error', `${helpers.isRequired('Token')}, please sign in or sign up`);
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    this.findClient = await database.queryOneORNone(findClientQuery, [verifyToken.userId]);
    if (!this.findClient) return helpers.response(res, 404, 'error', 'Token provided does not match any user');
    return next();
  }
}
