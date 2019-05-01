import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import pool from '../src/db/pgConnect';

export default class Test {
  static deleteData() {
    const deleteData = `CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

TRUNCATE clients CASCADE;
TRUNCATE staff CASCADE;
TRUNCATE admins CASCADE;
`;
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
