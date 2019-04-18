// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.userSignIn = (req, res) => {
  const registeredUser = services.findByValue(data.users, req.body, 'email', 'userEmail');
  if (!registeredUser) return services.errorResponse(res, 404, 'User does not exist, please sign up');
  if (registeredUser.password !== req.body.userPassword) return services.errorResponse(res, 400, 'Password does not match user');
  const responseUserData = data.createUserDataResponse(registeredUser);
  return services.successResponse(res, 200, responseUserData);
};

export default logic.userSignIn;
