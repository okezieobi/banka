import errors from './errorMessage';

export default class Patterns {
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
}
