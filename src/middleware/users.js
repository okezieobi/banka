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

  static signupClients() {
    const validate = validateUserRequest.signUp.bind(validateUserRequest);
    const auth = authenticateUsers.signUp.bind(authenticateUsers);
    const signup = middleware.routeCallbacks(validate, auth);
    return signup;
  }

  static signinClients() {
    const validate = validateUserRequest.signIn.bind(validateUserRequest);
    const auth = authenticateUsers.signIn.bind(authenticateUsers);
    const signin = middleware.routeCallbacks(validate, auth);
    return signin;
  }

  static signupAdmin() {
    const authSignUpAdmin = authenticateUsers.signUpAdmin.bind(authenticateUsers);
    const signup = middleware.routeCallbacks(this.validateAdminStaff(), authSignUpAdmin);
    return signup;
  }

  static signinAdmin() {
    const auth = authenticateUsers.signInAdmin.bind(authenticateUsers);
    const signin = middleware.routeCallbacks(this.validateAdminStaff(), auth);
    return signin;
  }

  static signupStaff() {
    const auth = authenticateUsers.signUpStaff.bind(authenticateUsers);
    const signup = middleware.routeCallbacks(this.validateAdminStaff(), auth);
    return signup;
  }

  static signinStaff() {
    const authSigninStaff = authenticateUsers.signInStaff.bind(authenticateUsers);
    const signin = middleware.routeCallbacks(this.validateAdminStaff(), authSigninStaff);
    return signin;
  }
}
