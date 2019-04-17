import creditAccount from '../../controllers/Staff/creditAccounts';
import router from '../router';
import validate from '../../controllers';

router.post('/transactions/:account_number/credit', (...args) => {
  validate.debitAccountInputs(...args);
}, creditAccount);

export default router;
