const router = require("express").Router();
const authController = require("../controllers/authController");

router
  .post("/login", authController.postLogin)
  .post("/register", authController.postRegister);


module.exports = router