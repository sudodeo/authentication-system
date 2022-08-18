const jwt = require("jsonwebtoken");
const { TOKEN_EXPIRY } = require("../config");
const { JWT_SECRET } = require("../config");

exports.createToken = (user) => {
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
    }
 