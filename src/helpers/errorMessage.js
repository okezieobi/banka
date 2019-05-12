export default class Errors {
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
}
