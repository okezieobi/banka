import transactionController from '../controllers/transactions';
import router from './router';
import transactionsMiddleware from '../middleware/transactions';

router.post('/transactions/:account_number/credit', transactionsMiddleware.creditAccount(),
  transactionController.creditAccount);

router.post('/transactions/:account_number/debit', transactionsMiddleware.debitAccount(),
  transactionController.debitAccount);

export default router;
