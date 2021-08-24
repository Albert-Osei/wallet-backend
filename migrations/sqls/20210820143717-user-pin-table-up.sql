/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();


CREATE TABLE "user_pin" (
    "id" SERIAL PRIMARY KEY,
    -- "user_id" uuid DEFAULT uuid_generate_v4 (),
    "pin" INT,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
    -- CONSTRAINT fk_user
    --     FOREIGN KEY("user_id")
    --         REFERENCES "users" ("id")
);

-- alternative for user_id duplicate
-- INSERT INTO "user_pin"( SELECT "id" FROM "users");


-- alternative for user_id duplicate
-- ALTER TABLE "user_pin" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")



