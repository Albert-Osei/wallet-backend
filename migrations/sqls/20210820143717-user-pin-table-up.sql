/* Replace with your SQL commands */
CREATE TABLE "user_pin" (
    "id" SERIAL PRIMARY KEY,
    "pin" INT,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);