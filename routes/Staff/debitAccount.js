import debitAccount from '../../controllers/Staff/debitAccounts';
import router from '../router';
import validate from '../../controllers';

router.post('/transactions/:account_number/debit', (...args) => {
  validate.debitAccountInputs(...args);
}, debitAccount);

export default router;
