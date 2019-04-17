import data from '../db';
import services from '../services';

class Banka {
  signUpInputs(req, res, next) {
    if (!req.body.userFirstName) return services.errorResponse(res, 400, 'First name is required');
    if (!services.checkName(req.body.userFirstName)) return services.errorResponse(res, 400, 'First name must be letters');
    if (!req.body.userLastName) return services.errorResponse(res, 400, 'Last name is required');
    if (!services.checkName(req.body.userLastName)) return services.errorResponse(res, 400, 'Last name must be letters');
    if (!req.body.userEmail) return services.errorResponse(res, 400, 'Email is required');
    if (!services.validateEmail(req.body.userEmail)) return services.errorResponse(res, 400, 'Email format is wrong');
    if (!req.body.userPassword) return services.errorResponse(res, 400, 'Password is required');
    if (!services.validatePassword(req.body.userPassword)) return services.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    if (services.findByValue(data.users, req.body, 'email', 'userEmail')) return services.errorResponse(res, 400, 'User exists, please sign in');
    this.next = next();
    return this.next;
  }

  signInInputs(req, res, next) {
    if (!req.body.userEmail) return services.errorResponse(res, 400, 'Email is required');
    if (!services.validateEmail(req.body.userEmail)) return services.errorResponse(res, 400, 'Email format is wrong');
    if (!req.body.userPassword) return services.errorResponse(res, 400, 'Password is required');
    if (!services.validatePassword(req.body.userPassword)) return services.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
    this.next = next();
    return this.next;
  }

  createBankAccountInputs(req, res, next) {
    if (!req.headers['owner-id']) return services.errorResponse(res, 400, 'User Id is required');
    if (!services.checkNumber(req.headers['owner-id'])) return services.errorResponse(res, 400, 'User id must be numbers');
    if (!req.body.bankAccountType) return services.errorResponse(res, 400, 'Bank account type is required');
    if (!services.checkName(req.body.bankAccountType)) return services.errorResponse(res, 400, 'Bank account type must be letters');
    if (req.body.bankAccountType !== 'current' && req.body.bankAccountType !== 'savings'
            && req.body.bankAccountType !== 'Current' && req.body.bankAccountType !== 'Savings') return services.errorResponse(res, 400, 'Bank account type must be savings or current');
    this.next = next();
    return this.next;
  }
}

const banka = new Banka();

export default banka;
