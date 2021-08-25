/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

CREATE TABLE "users" (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "first_name" varchar(100),
    "last_name" varchar(100),
    "email" varchar(100) UNIQUE,
    "phonenumber" varchar(100),
    "password" varchar(60),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);
-- ALTER TABLE "users" ADD CONSTRAINT fk_user UNIQUE("id")


