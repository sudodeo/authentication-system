const jwt = require("jsonwebtoken");
const { TOKEN_EXPIRY } = require("../config");
const { JWT_SECRET } = require("../config");

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const options = {
    expiresIn: parseInt(TOKEN_EXPIRY),
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

exports.decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    console.log(err.message);
    return;
  }
};
