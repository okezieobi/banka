/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/users.sql
*/


INSERT INTO clients
    (id, first_name, last_name, email, "password")
VALUES
    (1010101010101, 'Frank', 'Okezie', 'foobar@mail.com', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    clients;


INSERT INTO staff
    (id, username, "password")
VALUES
    (3030303030303, 'okezie', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    staff;


INSERT INTO admins
    (id, username, "password", "type")
VALUES
    (5050505050505, 'obiedere', crypt('AbcDFer123*@is!', gen_salt('bf', 12)), 'Admin');

SELECT
    *
FROM
    admins;
