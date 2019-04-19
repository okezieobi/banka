import userSignUp from './User/signUp';
import userSignIn from './User/signIn';
import createBankAccount from './User/createBankAccount';
import creditAccount from './Staff/creditAccount';
import debitAccount from './Staff/debitAccount';
import toggleAccount from './Admin/toggleAccounts';
import deleteAccount from './Admin/deleteAccount';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userSignUp);
  app.use(versionNumber, userSignIn);
  app.use(versionNumber, createBankAccount);
  app.use(versionNumber, debitAccount);
  app.use(versionNumber, creditAccount);
  app.use(versionNumber, deleteAccount);
  app.use(versionNumber, toggleAccount);
};
