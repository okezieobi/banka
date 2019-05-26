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

  static validateLetters(request, title) {
    const testRequest = regexTest.checkName(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notLetters(title);
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static checkEmailFormat(request, title) {
    const testRequest = regexTest.validateEmail(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notEmail();
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static checkPassword(request, title) {
    const testRequest = regexTest.validatePassword(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notPassword();
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static validateNumber(request, title) {
    const testRequest = regexTest.checkNumber(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notNumbers(title);
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static validateInteger(request, title) {
    const testRequest = regexTest.checkInteger(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notInteger(title);
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }

  static validateUsername(request, title) {
    const testRequest = regexTest.checkUserName(request);
    const errMessage = errors.isRequired(title);
    const testErrMessage = errors.notLettersAndNumbers(title);
    const err = this.checkRequest(request, testRequest, errMessage, testErrMessage);
    return err;
  }
}
