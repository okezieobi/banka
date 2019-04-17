// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.userSignUp = (req, res) => {
  const newUser = data.userData(req.body);
  data.users.push(newUser);
  const userDataRes = data.createUserDataResponse(newUser);
  return services.successResponse(res, 201, userDataRes);
};

export default logic.userSignUp;
