import accountsController from '../controllers/accounts';
import router from './router';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';

router.post('/accounts', (...args) => {
  validate.createBankAccountInputs(...args);
}, (...args) => {
  authenticate.authClients(...args);
}, accountsController.createAccount);

router.delete('/accounts/:account_number', (...args) => {
  validate.deleteAccountInputs(...args);
}, (...args) => {
  authenticate.authAdmins(...args);
}, (...args) => {
  authenticate.verifyAccount(...args);
}, accountsController.deleteAccount);

router.patch('/account/:account_number', (...args) => {
  validate.updateAccountStatusInput(...args);
}, (...args) => {
  authenticate.authAdmins(...args);
}, (...args) => {
  authenticate.verifyAccount(...args);
}, accountsController.updateStatus);

export default router;
