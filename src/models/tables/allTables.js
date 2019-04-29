import pool from '../../db/pgConnect';

const allTables = `CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS clients;

CREATE TABLE clients
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name  VARCHAR(128) NOT NULL,
    last_name   VARCHAR(128) NOT NULL,
    email       VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Client',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Staff',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);

DROP TABLE IF EXISTS admins;

CREATE TABLE admins
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Admin',
    isAdmin     BOOLEAN      DEFAULT 't',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts
(
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    "number"   INTEGER      NOT NULL UNIQUE,
    created_on TIMESTAMP    DEFAULT NOW(),
    "owner"    UUID         NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
    "type"     VARCHAR(128) NOT NULL,
    "status"   VARCHAR(128) DEFAULT 'Active',
    balance    NUMERIC      DEFAULT 0.00
);

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    created_on  TIMESTAMP    DEFAULT NOW(),
    "type"      VARCHAR(128) NOT NULL,
    account_no  INTEGER      NOT NULL REFERENCES accounts ("number") ON DELETE CASCADE,
    cashier     UUID         NOT NULL REFERENCES staff (id),
    amount      NUMERIC      NOT NULL,
    old_balance NUMERIC      NOT NULL,
    new_balance NUMERIC      NOT NULL
);
`;

pool.query(allTables);
