const dotenv = require("dotenv");

dotenv.config();

const development = {
    DATABASE_URL: process.env.DEV_DATABASE_URL,
}

module.exports = development;