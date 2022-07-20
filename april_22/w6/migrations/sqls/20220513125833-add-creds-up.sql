/* Replace with your SQL commands */

ALTER TABLE users
ADD email TEXT NOT NULL UNIQUE;

ALTER TABLE users
ADD password TEXT NOT NULL;