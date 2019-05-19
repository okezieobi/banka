import accountsController from '../controllers/accounts';
import router from './router';
import accountsMiddleware from '../middleware/accounts';

router.post('/accounts', accountsMiddleware.createAccount(), accountsController.createAccount);

router.delete('/accounts/:account_number', accountsMiddleware.deleteAccount(),
  accountsController.deleteAccount);

router.patch('/account/:account_number', accountsMiddleware.updateAccountStatus(),
  accountsController.updateStatus);

export default router;
