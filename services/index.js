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

  checkAmount(amount) {
    this.amountPattern = /^[0-9]+$/;
    return this.amountPattern.test(amount);
  }

  findUser(array, param) {
    this.foundUser = array.find(foundUser => foundUser.email === param.userEmail);
    return this.foundUser;
  }

  errorResponse(res, status, error) {
    this.errRes = {
      status,
      error,
    };
    res.send(this.errRes);
  }

  successResponse(res, status, data) {
    this.successRes = {
      status,
      data,
    };
    res.send(this.successRes);
  }
}

const banka = new Banka();

export default banka;
