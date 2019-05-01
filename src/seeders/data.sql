/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/data.sql
*/

INSERT INTO clients
    (first_name, last_name, email, "password")
VALUES
    ('Frank', 'Okezie', 'frank@email.com', '12345');

SELECT
    *
FROM
    clients;


INSERT INTO staff
    (username, "password")
VALUES
    ('okezie', '12345');

SELECT
    *
FROM
    staff;


INSERT INTO admins
    (username, "password", "type")
VALUES
    ('obiedere', '12345', 'Admin');

SELECT
    *
FROM
    admins;


INSERT INTO accounts
    ("number", "owner", "type")
VALUES
    (floor(random() * (1000000000 + 1)), 'b46f0f47-51fc-4b54-a0a2-cf6997a46f6c', 'current');


SELECT *
FROM accounts;


INSERT INTO transactions
    ("type", account_no, cashier, amount, old_balance, new_balance)
VALUES
    ('credit', 669296470, '39ad3c8b-388f-4166-9a6d-82022d766c50', 1000, 10000, 9000);

SELECT
    *
FROM
    transactions;
