const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const managerRoutes = require("./src/routes/managerRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const connect = require("./database/setup");
const seedAdmin = require("./src/seeders/admin");
const { PORT } = require("./src/config");

app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", managerRoutes);
app.use("/api", userRoutes);

const start = async () => {
  await connect();
  await seedAdmin();
  try {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
    console.log("Server failed to start");
    process.exit(1);
  }
};

start();
