const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res) => {
  const { email, password } = await req.body;
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = await req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
