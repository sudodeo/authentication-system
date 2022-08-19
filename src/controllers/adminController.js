const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      // prevent password from being sent to client
      user.password = undefined;
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // prevent password from being sent to client
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // prevent password from being sent to client
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
