import transactionController from '../controllers/transactions';
import router from './router';
import transactionsMiddleware from '../middleware/transactions';

router.post('/transactions/:account_number/credit', transactionsMiddleware.creditAccount(),
  transactionController.creditAccount.bind(transactionController));

router.post('/transactions/:account_number/debit', transactionsMiddleware.debitAccount(),
  transactionController.debitAccount.bind(transactionController));

router.get('/transactions/:transaction_id', transactionsMiddleware.getTransaction(),
  transactionController.getTransaction.bind(transactionController));

export default router;
