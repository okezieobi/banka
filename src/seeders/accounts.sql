/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/accounts.sql
*/

INSERT INTO accounts
    (id, "number", "owner", "type", balance)
VALUES
    (1111111111111, 12121212121,
        (SELECT id
        FROM clients
        WHERE email = 'frank@email.com'), 'current', 10000);

INSERT INTO accounts
    (id, "number", "owner", "type", "status")
VALUES
    (4444444444444, 14141414141,
        (SELECT id
        FROM clients
        WHERE email = 'frank@email.com'), 'savings', 'Dormant', 20000);


SELECT *
FROM accounts;
