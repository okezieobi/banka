import accountsController from '../controllers/accounts';
import router from './router';
import accountsMiddleware from '../middleware/accounts';

router.post('/accounts', accountsMiddleware.createAccount(), accountsController.createAccount);

router.delete('/accounts/:account_number', accountsMiddleware.deleteAccount(),
  accountsController.deleteAccount);

router.patch('/account/:account_number', accountsMiddleware.updateAccountStatus(),
  accountsController.updateStatus);

router.get('/accounts/:account_number/transactions', accountsMiddleware.getAccountHistory(),
  accountsController.getAccountHistory.bind(accountsController));

export default router;
