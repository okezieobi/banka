/*
RUN psql -d postgres -U bootcamp43 \c banka if not connected
RUN \i src/tables/accounts.sql
*/

DROP TABLE IF EXISTS accounts;


CREATE TABLE accounts
(
	id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
	"number"   INTEGER      NOT NULL UNIQUE,
	created_on TIMESTAMP    DEFAULT NOW(),
	"owner"    UUID         NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
	"type"     VARCHAR(128) NOT NULL,
	"status"   VARCHAR(128) DEFAULT 'Active',
	balance    NUMERIC      DEFAULT 0.00
);
