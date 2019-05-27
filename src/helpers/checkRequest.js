import regexTest from './regexTests';
import errors from './errorMessage';

export default class RequestCheck {
  static checkRequest(request, testRequest, errMessage, testErrMessage) {
    let err;
    if (!request) err = errMessage;
    else if (!testRequest) err = testErrMessage;
    return err;
  }

  static findError(...errorsList) {
    const err = errorsList.find(error => error);
    return err;
  }

  static checkValue(data, errMessage, ...values) {
    let err;
    const verifyValue = values.find(value => value === data);
    if (!verifyValue) err = errMessage;
    return err;
  }

  static checkAllErrors(request, title, test, error) {
    let testErrMessage;
    if (error === 'notEmail' || error === 'notPassword') {
      testErrMessage = errors[error]();
    } else {
      testErrMessage = errors[error](title);
    }
    const testRequest = regexTest[test](request);
    const errMessage = errors.isRequired(title);
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static validateLetters(request, title) {
    const err = this.checkAllErrors(request, title, 'checkName', 'notLetters');
    return err;
  }

  static checkEmailFormat(request, title) {
    const err = this.checkAllErrors(request, title, 'validateEmail', 'notEmail');
    return err;
  }

  static checkPassword(request, title) {
    const err = this.checkAllErrors(request, title, 'validatePassword', 'notPassword');
    return err;
  }

  static validateNumber(request, title) {
    const err = this.checkAllErrors(request, title, 'checkNumber', 'notNumbers');
    return err;
  }

  static validateInteger(request, title) {
    const err = this.checkAllErrors(request, title, 'checkInteger', 'notInteger');
    return err;
  }

  static validateUsername(request, title) {
    const err = this.checkAllErrors(request, title, 'checkUserName', 'notLettersAndNumbers');
    return err;
  }
}
