import validateUserRequest from '../data/users';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Users {
  static validateClients() {
    const validate = (...args) => { validateUserRequest.signIn(...args); };
    return validate;
  }

  static validateAdminStaff() {
    const validate = (...args) => { validateUserRequest.adminStaff(...args); };
    return validate;
  }

  static signupClients() {
    const validate = (...args) => { validateUserRequest.signUp(...args); };
    const auth = (...args) => { authenticateUsers.signUp(...args); };
    const signup = middleware.routeCallbacks(validate, auth);
    return signup;
  }

  static signinClients() {
    const validate = (...args) => { validateUserRequest.signIn(...args); };
    const auth = (...args) => { authenticateUsers.signIn(...args); };
    const signin = middleware.routeCallbacks(validate, auth);
    return signin;
  }

  static signupAdmin() {
    const authSignUpAdmin = (...args) => { authenticateUsers.signUpAdmin(...args); };
    const signup = middleware.routeCallbacks(this.validateAdminStaff(), authSignUpAdmin);
    return signup;
  }

  static signinAdmin() {
    const auth = (...args) => { authenticateUsers.signInAdmin(...args); };
    const signin = middleware.routeCallbacks(this.validateAdminStaff(), auth);
    return signin;
  }

  static signupStaff() {
    const auth = (...args) => { authenticateUsers.signUpStaff(...args); };
    const signup = middleware.routeCallbacks(this.validateAdminStaff(), auth);
    return signup;
  }

  static signinStaff() {
    const authSigninStaff = (...args) => { authenticateUsers.signInStaff(...args); };
    const signin = middleware.routeCallbacks(this.validateAdminStaff(), authSigninStaff);
    return signin;
  }
}
