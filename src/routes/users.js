import userController from '../controllers/users';
import router from './router';
import validate from '../middleware/validate';
import authenitcate from '../middleware/authenticate';

router.post('/auth/signup', (...args) => {
  validate.signUpInputs(...args);
}, (...args) => {
  authenitcate.authSignUp(...args);
}, userController.signUp);

router.post('/auth/signin', (...args) => {
  validate.signInInputs(...args);
}, (...args) => {
  authenitcate.authSignIn(...args);
}, userController.signIn);

router.post('/auth/signup/admin', (...args) => {
  validate.adminStaffinputs(...args);
}, (...args) => {
  authenitcate.authSignUpAdmin(...args);
}, userController.signUpAdmin);

router.post('/auth/signin/admin', (...args) => {
  validate.adminStaffinputs(...args);
}, (...args) => {
  authenitcate.authSignInAdmin(...args);
}, userController.signInAdmin);

router.post('/auth/signin/staff', (...args) => {
  validate.adminStaffinputs(...args);
}, (...args) => {
  authenitcate.authSignInStaff(...args);
}, userController.signinStaff);

router.post('/auth/signup/staff', (...args) => {
  validate.adminStaffinputs(...args);
}, (...args) => {
  authenitcate.authSignUpStaff(...args);
}, userController.signUpStaff);

export default router;
