import createBankAccounts from '../../controllers/User/createBankAccount';
import router from '../router';
import validate from '../../controllers';

router.post('/accounts', (...args) => {
  validate.createBankAccountInputs(...args);
}, createBankAccounts);

export default router;
