const express = require("express");
const routes = require("./src/routes/authRoutes");
const connect = require("./db/database");
const seedAdmin = require("./src/seeders/admin");
require("dotenv").config();

app = express();

app.use(express.json());

app.use(routes);

const start = async () => {
  await connect();
  console.log(await seedAdmin())
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
