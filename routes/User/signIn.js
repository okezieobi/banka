import signin from '../../controllers/User/signIn';
import router from '../router';

router.post('/auth/signin', signin);

export default router;
