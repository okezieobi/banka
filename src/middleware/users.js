import validateUserRequest from '../data/users';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Users {
  static validateClients() {
    const validate = validateUserRequest.signIn.bind(validateUserRequest);
    return validate;
  }

  static validateAdminStaff() {
    const validate = validateUserRequest.adminStaff.bind(validateUserRequest);
    return validate;
  }

  static authAdmin() {
    const auth = authenticateUsers.admin.bind(authenticateUsers);
    return auth;
  }

  static clients(method) {
    const validateAll = validateUserRequest[method].bind(validateUserRequest);
    const authAll = authenticateUsers[method].bind(authenticateUsers);
    const callBacks = middleware.routeCallbacks(validateAll, authAll);
    return callBacks;
  }

  static signupClients() {
    const signup = this.clients('signUp');
    return signup;
  }

  static signinClients() {
    const signin = this.clients('signIn');
    return signin;
  }

  static adminStaff(method) {
    const auth = authenticateUsers[method].bind(authenticateUsers);
    let callBacks;
    if (method === 'signInAdmin' || method === 'signInStaff') {
      callBacks = middleware.routeCallbacks(this.validateAdminStaff(), auth);
    } else {
      callBacks = middleware.routeCallbacks(this.validateAdminStaff(), this.authAdmin(), auth);
    }
    return callBacks;
  }

  static signupAdmin() {
    const signup = this.adminStaff('signUpAdmin');
    return signup;
  }

  static signupStaff() {
    const signup = this.adminStaff('signUpStaff');
    return signup;
  }


  static signinAdmin() {
    const signin = this.adminStaff('signInAdmin');
    return signin;
  }

  static signinStaff() {
    const signin = this.adminStaff('signInStaff');
    return signin;
  }
}
