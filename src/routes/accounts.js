import accountsController from '../controllers/accounts';
import router from './router';
import validate from '../middleware/validate';

router.post('/accounts', (...args) => {
  validate.createBankAccountInputs(...args);
}, accountsController.createAccount);

router.delete('/accounts/:account_number', (...args) => {
  validate.deleteAccountInputs(...args);
}, accountsController.deleteAccount);

router.patch('/account/:account_number', (...args) => {
  validate.updateAccountStatusInput(...args);
}, accountsController.updateStatus);

export default router;
