import transactionController from '../controllers/transactions';
import router from './router';
import validate from '../middleware/validate';

router.post('/transactions/:account_number/credit', (...args) => {
  validate.transactionInputs(...args);
}, transactionController.creditAccount);

router.post('/transactions/:account_number/debit', (...args) => {
  validate.transactionInputs(...args);
}, transactionController.debitAccount);

export default router;
