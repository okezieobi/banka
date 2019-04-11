class Banka {
  validateEmail(email) {
    this.emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return this.emailPattern.test(email);
  }

  validatePassword(password) {
    this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return this.passwordPattern.test(password);
  }

  checkName(name) {
    this.namePattern = /^[A-Za-z\s]+$/;
    return this.namePattern.test(name);
  }

  checkNumber(amount) {
    this.amountPattern = /^[0-9]+$/;
    return this.amountPattern.test(amount);
  }

  checkUserName(username) {
    this.usernamePattern = /^[a-zA-Z0-9\s.-]+$/;
    return this.usernamePattern.test(username);
  }

  findById(array, param, arrayAny, paramAny) {
    this.foundById = array.find(found => found[arrayAny] === parseInt(param[paramAny], 10));
    return this.foundById;
  }


  findByValue(array, param, arrayAny, paramAny) {
    this.foundByValue = array.find(found => found[arrayAny] === param[paramAny]);
    return this.foundByValue;
  }

  errorResponse(res, codeStatus, error) {
    this.errRes = {
      status: codeStatus,
      error,
    };
    res.status(codeStatus).send(this.errRes);
  }

  successResponse(res, codeStatus, data) {
    this.successRes = {
      status: codeStatus,
      data,
    };
    res.status(codeStatus).send(this.successRes);
  }
}

const banka = new Banka();

export default banka;
