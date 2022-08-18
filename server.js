const express = require("express");
const routes = require("./src/routes/authRoutes");
const connect = require("./db/database");
require("dotenv").config();

app = express();

app.use(express.json());

app.use(routes);

const start = async () => {
  await connect();
  try {
    app.listen(process.env.PORT);
    console.log(`Server started on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err.message);
    console.log("Server failed to start");
    process.exit(1);
  }
};


start();
