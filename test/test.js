import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import pool from '../src/db/pgConnect';
import seeder from '../src/seeders/seeder';

export default class Test {
  static deleteData() {
    const deleteData = seeder.deleteAll;
    return deleteData;
  }
}

require('./users/signIn');
require('./users/signUp');
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
  pool,
};
