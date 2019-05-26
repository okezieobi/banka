/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/transactions.sql
*/

INSERT INTO transactions
    (id, "type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    (6666666666666, 'Debit',
        (SELECT "number"
        FROM accounts
        WHERE id = 1111111111111),
        (SELECT id
        FROM staff
        WHERE username = 'okezie'), 1000, 9000, 8000);

INSERT INTO transactions
    (id, "type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    (8888888888888, 'Debit',
        (SELECT "number"
        FROM accounts
        WHERE id = 1111111111111),
        (SELECT id
        FROM staff
        WHERE username = 'okezie'), 1000, 80000, 7000);

INSERT INTO transactions
    (id, "type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    (9999999999999, 'Debit',
        (SELECT "number"
        FROM accounts
        WHERE id = 1111111111111),
        (SELECT id
        FROM staff
        WHERE username = 'okezie'), 1000, 7000, 6000);

SELECT
    *
FROM
    transactions;
