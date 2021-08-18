const dotenv = require("dotenv");

dotenv.config();

const production = {
    DATABASE_URL: process.env.PROD_DATABASE_URL,
}

module.exports = production;