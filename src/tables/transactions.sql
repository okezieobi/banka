/*
RUN psql -d postgres -U bootcamp43 \c banka if not connected
RUN \i src/models/tables/transactions.sql
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

/*
INSERT INTO transactions
    ("type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    ('credit', 669296470, '39ad3c8b-388f-4166-9a6d-82022d766c50', 1000, 10000, 9000);

SELECT
    *
FROM
    transactions;
*/
