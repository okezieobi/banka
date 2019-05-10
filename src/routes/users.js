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
  validate.createAdminStaffinputs(...args);
}, (...args) => {
  authenitcate.authCreateAdmin(...args);
}, userController.createAdmin);

router.post('/auth/signin/admin', (...args) => {
  validate.createAdminStaffinputs(...args);
}, (...args) => {
  authenitcate.authSignInAdmin(...args);
}, userController.signInAdmin);

export default router;
