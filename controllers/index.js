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
}

const banka = new Banka();

export default banka;
