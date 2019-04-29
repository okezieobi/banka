import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import pool from '../src/db/pgConnect';

const resetDatabase = `CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

TRUNCATE clients CASCADE;
TRUNCATE staff CASCADE;
TRUNCATE admins CASCADE;
`;

const dataInsert = `INSERT INTO clients
(first_name, last_name, email, "password")
VALUES
('Frank', 'Okezie', 'haha@email.com', '12345');`;

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
  resetDatabase,
  dataInsert,
  pool,
};
