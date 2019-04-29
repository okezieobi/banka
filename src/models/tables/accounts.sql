/*
RUN psql -d postgres -U bootcamp43 and connect with \c banka if not connected
RUN \i src/models/tables/accounts.sql
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


/*
INSERT INTO accounts
	("number", "owner", "type")
VALUES
	(floor(random() * (1000000000 + 1)), 'b46f0f47-51fc-4b54-a0a2-cf6997a46f6c', 'current');


SELECT *
FROM accounts;
*/
