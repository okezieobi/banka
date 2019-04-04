import signup from '../../controllers/User/signIn';
import router from '../router';

router.post('/auth/signup', signup);

export default router;
