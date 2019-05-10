import accountsController from '../controllers/accounts';
import router from './router';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';

router.post('/accounts', (...args) => {
  validate.createBankAccountInputs(...args);
}, (...args) => {
  authenticate.clients(...args);
}, accountsController.createAccount);

router.delete('/accounts/:account_number', (...args) => {
  validate.deleteAccountInputs(...args);
}, accountsController.deleteAccount);

router.patch('/account/:account_number', (...args) => {
  validate.updateAccountStatusInput(...args);
}, (...args) => {
  authenticate.authUpdateAccountStatus(...args);
}, accountsController.updateStatus);

export default router;
