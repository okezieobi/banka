/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/users.sql
*/

INSERT INTO clients
    (first_name, last_name, email, "password")
VALUES
    ('Frank', 'Okezie', 'frank@email.com', '1234AOdBcd!');

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
