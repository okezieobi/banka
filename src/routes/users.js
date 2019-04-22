import userController from '../controllers/users';
import router from './router';
import validate from '../middleware/validate';

router.post('/auth/signup', (...args) => {
  validate.signUpInputs(...args);
}, userController.signUp);

router.post('/auth/signin', (...args) => {
  validate.signInInputs(...args);
}, userController.signIn);

export default router;
