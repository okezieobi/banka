import debitAccount from '../../controllers/Staff/debitAccounts';
import router from '../router';

router.post('/transactions/:account_number/debit', debitAccount);

export default router;
