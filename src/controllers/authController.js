const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwtService");

// login user
exports.postLogin = async (req, res) => {
  const { email, password } = await req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({ message: "User not found" });
  }
  try {
    const passwordMatch = await bcrypt.compare(password, foundUser.password)
    if (passwordMatch) {
      const token = await jwtService.createToken(foundUser);
      res.status(200).json({
        message: "User logged in",
        token,
      });
    } else {
      res.status(401).json({ message: "Incorrect details" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Register a new user
exports.postRegister = async (req, res) => {
  const { username, email, password } = await req.body;

  const foundUser = await User.findOne({ email } || { username });
  if (foundUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create(
      {
        username,
        email,
        password: hashedPassword,
      },
      (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error creating user" });
        } else {
          // user.password = hashedPassword;
          user.save();
          const token = jwtService.createToken(user)
          res.status(201).json({message: "User registration successful", token});
        }
      }
    );
    

    req.user = user;

    // res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
