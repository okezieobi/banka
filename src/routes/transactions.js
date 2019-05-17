import transactionController from '../controllers/transactions';
import router from './router';
import { ValidateTransactionInput } from '../middleware/tranasactions';

router.post('/transactions/:account_number/credit', (...args) => {
  ValidateTransactionInput.transaction(...args);
}, transactionController.creditAccount);

router.post('/transactions/:account_number/debit', (...args) => {
  ValidateTransactionInput.transaction(...args);
}, transactionController.debitAccount);

export default router;
