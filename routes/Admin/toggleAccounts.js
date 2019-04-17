import toggleAccounts from '../../controllers/Admin/toggleAccounts';
import router from '../router';
import validate from '../../controllers';

router.patch('/account/:account_number', (...args) => {
  validate.toggleAccountStatusInput(...args);
}, toggleAccounts);

export default router;
