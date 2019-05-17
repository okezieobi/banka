import accountsController from '../controllers/accounts';
import router from './router';
import { ValidateAccountInput, AuthenticateAccount } from '../middleware/accounts';
import { AuthenticateUsers } from '../middleware/users';

router.post('/accounts', (...args) => {
  ValidateAccountInput.createAccount(...args);
}, (...args) => {
  AuthenticateUsers.clients(...args);
}, accountsController.createAccount);

router.delete('/accounts/:account_number', (...args) => {
  ValidateAccountInput.deleteAccount(...args);
}, (...args) => {
  AuthenticateUsers.admin(...args);
}, (...args) => {
  AuthenticateAccount.account(...args);
}, accountsController.deleteAccount);

router.patch('/account/:account_number', (...args) => {
  ValidateAccountInput.updateAccountStatus(...args);
}, (...args) => {
  AuthenticateUsers.admin(...args);
}, (...args) => {
  AuthenticateAccount.account(...args);
}, accountsController.updateStatus);

export default router;
