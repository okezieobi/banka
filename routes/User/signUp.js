import signup from '../../controllers/User/signUp';
import router from '../router';

router.post('/auth/signup', signup);

export default router;
