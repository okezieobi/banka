export default class Helper {
  static validateEmail(email) {
    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailPattern.test(email);
  }

  static validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  static checkName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  }

  static checkNumber(amount) {
    const amountPattern = /^[0-9]+$/;
    return amountPattern.test(amount);
  }

  static checkUserName(username) {
    const usernamePattern = /^[a-zA-Z0-9\s.-]+$/;
    return usernamePattern.test(username);
  }

  static findById(array, param, arrayAny, paramAny) {
    const foundById = array.find(found => found[arrayAny] === parseInt(param[paramAny], 10));
    return foundById;
  }


  static findByValue(array, param, arrayAny, paramAny) {
    const foundByValue = array.find(found => found[arrayAny] === param[paramAny]);
    return foundByValue;
  }

  static isRequired(title) {
    const isRequiredErrMessage = `${title} is required`;
    return isRequiredErrMessage;
  }

  static notLetters(title) {
    const notLettersErrMessage = `${title} must be letters`;
    return notLettersErrMessage;
  }

  static notNumbers(title) {
    const notNumbersErrMessage = `${title} must be numbers`;
    return notNumbersErrMessage;
  }

  static userExists(title) {
    const userExistsErr = `${title} exists, please sign in`;
    return userExistsErr;
  }

  static userNotExists(title) {
    const userNotExistsErr = `${title} does not exist, please sign up`;
    return userNotExistsErr;
  }

  static notEmail() {
    const notEmailErrMessage = 'Email format is wrong';
    return notEmailErrMessage;
  }

  static notPassword() {
    const notPasswordErrMessage = 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character';
    return notPasswordErrMessage;
  }

  static tokenIsRequired() {
    const tokenRequiredErrMessage = 'Token is required, please sign in or sign up';
    return tokenRequiredErrMessage;
  }

  static wrongToken() {
    const wrongTokenErrMessage = 'Token provided does not match any user';
    return wrongTokenErrMessage;
  }

  static wrongPassword() {
    const wrongPasswordErr = 'Password does not match user';
    return wrongPasswordErr;
  }

  static response(res, codeStatus, resKey, resValue) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
    };
    res.status(codeStatus).send(errRes);
  }

  static authResponse(res, codeStatus, resKey, resValue, token, ownerId, id) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
      headers: {
        [ownerId]: id,
        'access-token': token,
      },
    };
    res.status(codeStatus).set(errRes.headers).send(errRes);
  }
}
