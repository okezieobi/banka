import deleteAccount from '../../controllers/Admin/deleteAccount';
import router from '../router';

router.delete('/accounts/:account_number', deleteAccount);

export default router;
