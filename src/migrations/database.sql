/*
RUN psql -d postgres -U bootcamp43 
RUN \i src/migrations/database.sql \q
*/

DROP DATABASE IF EXISTS banka;
CREATE DATABASE banka;

CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

\c banka \i src/tables/users.sql 
\i src/tables/accounts.sql 
\i src/tables/transactions.sql
