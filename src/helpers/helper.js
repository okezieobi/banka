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

  static errorResponse(res, codeStatus, error) {
    const errRes = {
      status: codeStatus,
      error,
    };
    res.status(codeStatus).send(errRes);
  }

  static successResponse(res, codeStatus, data) {
    const successRes = {
      status: codeStatus,
      data,
    };
    res.status(codeStatus).send(successRes);
  }

  static successResMessage(res, codeStatus, message) {
    const successRes = {
      status: codeStatus,
      message,
    };
    res.status(codeStatus).send(successRes);
  }
}
