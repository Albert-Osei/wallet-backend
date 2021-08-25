require("./src/config/database.config");

const express = require("express")
const apiVersion1 = require("./src/config/versioning/v1");
const { notFound, appErrorHandler, genericErrorHandler } = require("./src/middlewares/error.middleware");
// const envConfig = require("./src/config/env/index")

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});

app.use("/api/v1", apiVersion1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

module.exports = app;