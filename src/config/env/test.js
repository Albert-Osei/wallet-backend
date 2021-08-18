const dotenv = require("dotenv");

dotenv.config();

const test = {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
}

module.exports = test;