/*
RUN psql -d postgres -U bootcamp43 
RUN \i src/migrations/database.sql \q
*/

DROP DATABASE IF EXISTS banka;
CREATE DATABASE banka;

\c banka \i src/tables/users.sql 
\i src/tables/accounts.sql 
\i src/tables/transactions.sql

/*
\i src/seeders/users.sql
\i src/seeders/accounts.sql
\i src/seeders/transactions.sql
*/
