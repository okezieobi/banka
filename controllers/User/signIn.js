// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.userSignIn = (req, res) => {
  if (!req.body.userEmail) return services.errorResponse(res, 400, 'Email is required');
  if (!services.validateEmail(req.body.userEmail)) return services.errorResponse(res, 400, 'Email format is wrong');
  if (!req.body.userPassword) return services.errorResponse(res, 400, 'Password is required');
  if (!services.validatePassword(req.body.userPassword)) return services.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  const registeredUser = services.findByValue(data.users, req.body, 'email', 'userEmail');
  if (!registeredUser) return services.errorResponse(res, 400, 'User does not exist, please sign up');
  if (registeredUser.password !== req.body.userPassword) return services.errorResponse(res, 400, 'Password does not match user');
  const responseUserData = data.createUserDataResponse(registeredUser);
  return services.successResponse(res, 200, responseUserData);
};

export default logic.userSignIn;
