/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/seeders/deleteAll.sql
*/

TRUNCATE clients
CASCADE;
TRUNCATE staff CASCADE;
TRUNCATE admins CASCADE;
