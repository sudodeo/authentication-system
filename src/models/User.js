const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "staff", "manager", "admin"],
    default: "user",
  },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;
