import toggleAccounts from '../../controllers/Admin/toggleAccounts';
import router from '../router';

router.patch( '/account/:account_number', toggleAccounts );

export default router;
