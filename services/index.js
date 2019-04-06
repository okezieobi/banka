class Banka {
  async validateEmail(email) {
    this.emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return this.emailPattern.test(email);
  }

  async validatePassword(password) {
    this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return this.passwordPattern.test(password);
  }

  async checkName(name) {
    this.namePattern = /^[A-Za-z\s]+$/;
    return this.namePattern.test(name);
  }

  findUser(array, param) {
    this.foundUser = array.find(foundUser => foundUser.userEmail === param.userEmail);
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
