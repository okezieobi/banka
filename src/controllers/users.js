import data from '../db/users';
import helpers from '../helpers/helper';
import models from '../models/users';

export default class Users {
  static signUp(req, res) {
    if (helpers.findByValue(data.users.clients, req.body, 'email', 'userEmail')) return helpers.errorResponse(res, 400, 'User exists, please sign in');
    const newUser = models.userData(req.body);
    data.users.clients.push(newUser);
    const userDataRes = models.createUserDataResponse(newUser);
    return helpers.successResponse(res, 201, userDataRes);
  }

  static signIn(req, res) {
    const registeredUser = helpers.findByValue(data.users.clients, req.body, 'email', 'userEmail');
    if (!registeredUser) return helpers.errorResponse(res, 404, 'User does not exist, please sign up');
    if (registeredUser.password !== req.body.userPassword) return helpers.errorResponse(res, 400, 'Password does not match user');
    const responseUserData = models.createUserDataResponse(registeredUser);
    return helpers.successResponse(res, 200, responseUserData);
  }
}
