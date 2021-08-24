/* Replace with your SQL commands */
CREATE TABLE fundDeposit (
    "id" SERIAL,
    "currency" varchar(100),
    "amount" varchar(100),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);