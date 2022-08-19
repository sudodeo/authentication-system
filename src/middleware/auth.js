const jwtService = require("../services/jwtService");
const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  //check if token is valid
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwtService.decodeToken(token);

  if (!decodedToken) {
    return res.status(401).json({
      message: "malformed/expired token",
    });
  }
  let user = await User.findOne({ _id: decodedToken.id });
  console.log(await User.findOne({ email: decodedToken.email }));
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  req.user = decodedToken;

  next();
};

exports.checkRole =
  (rolesArray = ["user"]) =>
  (req, res, next) => {
    const { role } = req.user;

    if (rolesArray.includes(role)) {
      next();
    }
    return res
      .status(403)
      .json({ message: `route restricted to ${rolesArray.join(", ")}` });
  };
