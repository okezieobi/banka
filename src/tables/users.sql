/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/tables/users.sql
*/

DROP TABLE IF EXISTS clients;

CREATE TABLE clients
(
    id          BIGINT       PRIMARY KEY NOT NULL,
    first_name  VARCHAR(128) NOT NULL,
    last_name   VARCHAR(128) NOT NULL,
    email       VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Client',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMPTZ  DEFAULT NOW(),
    modify_date TIMESTAMPTZ  DEFAULT NOW()
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff
(
    id          BIGINT       PRIMARY KEY NOT NULL,
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Staff',
    isAdmin     BOOLEAN      DEFAULT 'f',
    create_date TIMESTAMPTZ  DEFAULT NOW(),
    modify_date TIMESTAMPTZ  DEFAULT NOW()
);


DROP TABLE IF EXISTS admins;

CREATE TABLE admins
(
    id          BIGINT       PRIMARY KEY NOT NULL,
    username    VARCHAR(128) NOT NULL UNIQUE,
    "password"  VARCHAR(128) NOT NULL,
    "type"      VARCHAR(128) DEFAULT 'Admin',
    isAdmin     BOOLEAN      DEFAULT 't',
    create_date TIMESTAMPTZ  DEFAULT NOW(),
    modify_date TIMESTAMPTZ  DEFAULT NOW()
);
