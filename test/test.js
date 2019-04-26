import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

require('./users/signIn');
// require('./users/signUp');
require('./accounts/createBankAccounts');
require('./transactions/debitAccounts');
require('./transactions/creditAccounts');
require('./accounts/updateAccountStatus');
require('./accounts/deleteAccount');

export {
  expect,
  chai,
  chaiHttp,
  app,
};
