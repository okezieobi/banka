/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/models/tables/users.sql
*/


CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS clients;

CREATE TABLE clients
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name  VARCHAR(128) NOT NULL,
    last_name   VARCHAR(128) NOT NULL,
    email       VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Client',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Staff',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);


DROP TABLE IF EXISTS admins;

CREATE TABLE admins
(
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Admin',
    isAdmin     BOOLEAN      DEFAULT 't',
    create_date TIMESTAMP    DEFAULT NOW(),
    modify_date TIMESTAMP    DEFAULT NOW()
);


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
