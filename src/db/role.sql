/*
RUN psql -U postgres -a -f "src/db/role.sql" to create role
*/
DROP ROLE IF EXISTS bootcamp43;
CREATE ROLE bootcamp43
WITH LOGIN PASSWORD 'lovely' CREATEDB SUPERUSER;
