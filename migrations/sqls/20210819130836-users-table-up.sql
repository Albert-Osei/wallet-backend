/* Replace with your SQL commands */
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" varchar(100),
    "last_name" varchar(100),
    "email" varchar(100) UNIQUE,
    "phonenumber" varchar(100),
    "password" varchar(60),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);