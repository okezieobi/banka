/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/accounts.sql
*/

INSERT INTO accounts
    ("number", "owner", "type")
VALUES
    (669296470, 'b46f0f47-51fc-4b54-a0a2-cf6997a46f6c', 'current');


SELECT *
FROM accounts;
