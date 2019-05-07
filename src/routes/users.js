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

export default router;
