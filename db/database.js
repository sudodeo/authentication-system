const mongoose = require("mongoose");
require("dotenv").config();

connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, console.log("connected to database"));
    
  } catch (err) {
    console.error(err.message);
    console.error("failed to connect database");
    process.exit(1);
  }
};

module.exports = connect;
