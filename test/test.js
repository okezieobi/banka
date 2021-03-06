import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import pool from '../src/db/pgConnect';
import seeder from '../src/seeders/seeder';
import token from '../src/helpers/jwt';

export default class Test {
  static deleteData() {
    const deleteData = seeder.deleteAll;
    return deleteData;
  }

  static users() {
    const userData = seeder.users.insertData;
    return userData;
  }

  static accounts() {
    const accountsData = seeder.accounts.insertData;
    return accountsData;
  }

  static transactions() {
    const transactionData = seeder.transactions.insertData;
    return transactionData;
  }

  static generateToken(id) {
    const newToken = token.generate(id);
    return newToken;
  }
}

require('./users/signIn');
require('./users/signUp');
require('./users/admin/signin');
require('./users/admin/signup');
require('./users/staff/signin');
require('./users/staff/signup');
require('./accounts/createBankAccounts');
require('./transactions/debitAccounts');
require('./transactions/creditAccounts');
require('./accounts/updateAccountStatus');
require('./accounts/deleteAccount');
require('./accounts/accountHistory');
require('./transactions/getTransaction');

export {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
};
