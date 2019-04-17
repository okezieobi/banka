import signup from '../../controllers/User/signUp';
import router from '../router';
import validate from '../../controllers';

router.post('/auth/signup', (...args) => {
  validate.signUpInputs(...args);
}, signup);

export default router;
