const express = require("express");
const routes = require("./routes/authRoutes");
const connect = require("./config/database");
require("dotenv").config();

app = express();

connect();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
