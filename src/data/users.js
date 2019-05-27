import protocol from '../helpers/response';
import checkRequest from '../helpers/checkRequest';

export default class ValidateUserRequest {
  static signUp(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const firstNameErr = checkRequest.validateLetters(userFirstName, 'First name');
    const lastNameErr = checkRequest.validateLetters(userLastName, 'Last name');
    const emailErr = checkRequest.checkEmailFormat(userEmail, 'Email');
    const passwordErr = checkRequest.checkPassword(userPassword, 'Password');
    const findError = checkRequest.findError(firstNameErr, lastNameErr, emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static checkError(userData, userDataTest, userDataTitle, password) {
    const checkUserData = checkRequest[userDataTest](userData, userDataTitle);
    const checkPassword = checkRequest.checkPassword(password, 'Password');
    const findError = checkRequest.findError(checkUserData, checkPassword);
    let err;
    if (findError) err = findError;
    return err;
  }

  static signIn(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const signInErr = this.checkError(userEmail, 'checkEmailFormat', 'Email', userPassword);
    if (signInErr) protocol.err400Res(res, signInErr);
    else next();
  }

  static adminStaff(req, res, next) {
    const { userName, adminStaffPassword } = req.body;
    const signInErr = this.checkError(userName, 'validateUsername', 'Username', adminStaffPassword);
    if (signInErr) protocol.err400Res(res, signInErr);
    else next();
  }
}
