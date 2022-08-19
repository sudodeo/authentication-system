const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const {validateAuthRequest, authValidationResult} = require("../middleware/validator");

router
  .post("/login", authController.postLogin)
  .post("/register", validateAuthRequest, authValidationResult, authController.postRegister)
  .post("/resetpassword", authController.postPasswordReset)
  .put("/resetpassword/:token", authController.putPasswordReset)

module.exports = router