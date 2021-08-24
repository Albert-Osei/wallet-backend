/* Replace with your SQL commands */
CREATE TABLE fundTransfer (
    "id" SERIAL,
    "currency" varchar(100),
    "account_number" varchar(100),
    "amount" varchar(100),
    "pin" varchar(100),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);