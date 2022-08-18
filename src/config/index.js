require('dotenv').config()


module.exports = {
    mongoURI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT
}