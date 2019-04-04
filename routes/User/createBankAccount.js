import createBankAccounts from '../../controllers/User/createBankAccount';
import router from '../router';

router.post('/accounts', createBankAccounts);

export default router;
