import toggleAccounts from '../../controllers/Admin/toggleAccounts';
import router from '../router';

router.patch('/accounts/:account_number', toggleAccounts);

export default router;
