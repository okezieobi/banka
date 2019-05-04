/*
RUN psql -d postgres -U bootcamp43 \c banka if not connected
RUN \i src/tables/transactions.sql
*/

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions
(
    id          BIGINT       PRIMARY KEY NOT NULL,
    created_on  TIMESTAMPTZ  DEFAULT NOW(),
    "type"      VARCHAR(128) NOT NULL,
    account_no  BIGINT       NOT NULL REFERENCES accounts ("number") ON DELETE CASCADE,
    cashier     BIGINT       NOT NULL REFERENCES staff (id),
    amount      NUMERIC      NOT NULL,
    old_balance NUMERIC      NOT NULL REFERENCES accounts (balance),
    new_balance NUMERIC      NOT NULL
);
