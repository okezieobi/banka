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
    let err;
    errorsList.forEach((error) => {
      if (error) err = error;
    });
    return err;
  }

  static checkValue(data, errMessage, ...values) {
    let err;
    const verifyValue = values.find(value => value === data);
    if (!verifyValue) err = errMessage;
    return err;
  }

  static validateLetters(request, title) {
    const err = this.checkRequest(request, regexTest.checkName(request),
      errors.isRequired(title), errors.notLetters(title));
    return err;
  }

  static checkEmailFormat(request, title) {
    const err = this.checkRequest(request, regexTest.validateEmail(request),
      errors.isRequired(title), errors.notEmail());
    return err;
  }

  static checkPassword(request, title) {
    const err = this.checkRequest(request, regexTest.validatePassword(request),
      errors.isRequired(title), errors.notPassword());
    return err;
  }

  static validateNumber(request, title) {
    const err = this.checkRequest(request, regexTest.checkNumber(request),
      errors.isRequired(title), errors.notNumbers(title));
    return err;
  }

  static validateUsername(request, title) {
    const err = this.checkRequest(request, regexTest.checkUserName(request),
      errors.isRequired(title), errors.notLettersAndNumbers(title));
    return err;
  }
}
