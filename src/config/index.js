require("dotenv").config();

module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRATION_TIME,
  PORT: process.env.PORT,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
};
