import deleteAccount from '../../controllers/Admin/deleteAccount';
import router from '../router';
import validate from '../../controllers';

router.delete('/accounts/:account_number', (...args) => {
  validate.deleteAccountInputs(...args);
}, deleteAccount);

export default router;
