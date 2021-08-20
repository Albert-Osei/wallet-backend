const dotenv = require("dotenv");

dotenv.config();

const development = {
    DATABASE_URL: process.env.DEV_DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}

module.exports = development;