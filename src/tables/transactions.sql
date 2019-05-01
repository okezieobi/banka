/*
RUN psql -d postgres -U bootcamp43 \c banka if not connected
RUN \i src/tables/transactions.sql
*/

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
