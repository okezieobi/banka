import userController from '../controllers/users';
import router from './router';
import { ValidateUserInput, AuthenticateUsers } from '../middleware/users';

router.post('/auth/signup', (...args) => {
  ValidateUserInput.signUp(...args);
}, (...args) => {
  AuthenticateUsers.signUp(...args);
}, userController.signUp);

router.post('/auth/signin', (...args) => {
  ValidateUserInput.signIn(...args);
}, (...args) => {
  AuthenticateUsers.signIn(...args);
}, userController.signIn);

router.post('/auth/signup/admin', (...args) => {
  ValidateUserInput.adminStaff(...args);
}, (...args) => {
  AuthenticateUsers.signUpAdmin(...args);
}, userController.signUpAdmin);

router.post('/auth/signin/admin', (...args) => {
  ValidateUserInput.adminStaff(...args);
}, (...args) => {
  AuthenticateUsers.signInAdmin(...args);
}, userController.signinAdminStaff);

router.post('/auth/signin/staff', (...args) => {
  ValidateUserInput.adminStaff(...args);
}, (...args) => {
  AuthenticateUsers.authSignInStaff(...args);
}, userController.signinAdminStaff);

router.post('/auth/signup/staff', (...args) => {
  ValidateUserInput.adminStaff(...args);
}, (...args) => {
  AuthenticateUsers.signUpStaff(...args);
}, userController.signUpStaff);

export default router;
