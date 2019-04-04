import creditAccount from '../../controllers/Staff/creditAccounts';
import router from '../router';

router.post('/transactions/:account_number/credit', creditAccount);

export default router;
