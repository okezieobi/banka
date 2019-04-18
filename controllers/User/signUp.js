// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.userSignUp = (req, res) => {
  if (services.findByValue(data.users, req.body, 'email', 'userEmail')) return services.errorResponse(res, 400, 'User exists, please sign in');
  const newUser = data.userData(req.body);
  data.users.push(newUser);
  const userDataRes = data.createUserDataResponse(newUser);
  return services.successResponse(res, 201, userDataRes);
};

export default logic.userSignUp;
