/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/transactions.sql
*/

INSERT INTO transactions
    (id, "type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    (7777777777777, 'credit',
        (SELECT "number"
        FROM accounts
        WHERE id = 1111111111111),
        (SELECT id
        FROM staff
        WHERE username = 'okezie'), 1000, 10000, 9000);

SELECT
    *
FROM
    transactions;
