const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Check if there is an admin account in the database
seedAdmin = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    await User.create(
      {
        username: "admin",
        email: "admin@website.com",
        password: "admin1234",
        role: "admin",
      },
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          hashedPassword = bcrypt.hash(user.password, 12, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              user.password = hash;
              user.save((err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  return `Admin account created: ${user.username}`;
                }
              });
            }
          });
        }
      }
    );
  }
  else return "admin account already exists";
};

module.exports = seedAdmin;