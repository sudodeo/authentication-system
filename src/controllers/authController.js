const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwtService");
const { sendPasswordResetEmail } = require("../services/email");

// login user
exports.postLogin = async (req, res) => {
  const { email, password, username } = await req.body;

  let foundUser;
  if (email && username) {
    foundUser = await User.findOne({ username, email });
  } else if (email) {
    foundUser = await User.findOne({ email });
  } else if (username) {
    foundUser = await User.findOne({ username });
  }

  if (!foundUser) {
    return res.status(401).json({ message: "User not found" });
  }
  try {
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
      const token = await jwtService.generateToken(foundUser);

      return res.status(200).json({
        message: "User logged in",
        token,
      });
    } else {
      return res.status(401).json({ message: "Incorrect details" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error" });
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
    User.create(
      {
        username,
        email,
        password: hashedPassword,
      },
      (err, user) => {
        if (err) {
          console.log(err.message);
          res.status(500).json({ message: "Error creating user" });
        } else {
          user.save();
          const token = jwtService.generateToken(user);
          res
            .status(201)
            .json({ message: "User registration successful", token });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postPasswordReset = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    const token = await jwtService.generateToken(foundUser);
    const mail = await sendPasswordResetEmail(foundUser.email, token);
    console.log(mail);
    if (mail.status === 200) {
      res.status(200).json({ message: mail.message });
    } else {
      res.status(mail.status).json({ message: mail.message });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.putPasswordReset = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;

  const decodedToken = jwtService.decodeToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const foundUser = await User.findOne({ email: decodedToken.email });
  if (!foundUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    await User.findOneAndUpdate(
      { email: decodedToken.email },
      { password: hashedPassword }
    );

    return res.status(204).json({ message: "Password updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Could not update password" });
  }
};
