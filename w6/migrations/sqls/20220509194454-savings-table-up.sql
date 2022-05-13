/* Replace with your SQL commands */

CREATE TABLE savings (
    id SERIAL PRIMARY KEY,
    account INT NOT NULL,
    balance FLOAT DEFAULT 0
);

ALTER TABLE savings
ADD CONSTRAINT fk_user_savings
FOREIGN KEY (account)
REFERENCES users;