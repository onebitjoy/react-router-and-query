"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dataImporter_1 = require("./dataImporter");
const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send(dataImporter_1.data.todos);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
