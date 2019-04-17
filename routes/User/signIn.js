import signin from '../../controllers/User/signIn';
import router from '../router';
import validate from '../../controllers';

router.post('/auth/signin', (...args) => {
  validate.signInInputs(...args);
}, signin);

export default router;
