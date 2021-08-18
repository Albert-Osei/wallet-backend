const { json } = require("express");
const express = require("express")

const apiVersion1 = require("./src/config/versioning/v1");

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});

app.use("/api/v1", apiVersion1);