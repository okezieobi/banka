/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/transactions.sql
*/

INSERT INTO transactions
    ("type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    ('credit', 669296470, '39ad3c8b-388f-4166-9a6d-82022d766c50', 1000, 10000, 9000);

SELECT
    *
FROM
    transactions;
