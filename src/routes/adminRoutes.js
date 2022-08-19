const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const adminController = require("../controllers/adminController");


// Admins can retrieve, create, update, delete users
router
  .get(
    "/",
    authMiddleware.authenticateUser,
    authMiddleware.checkRole(["admin"]),
    adminController.getAllUsers
  )
  .get(
    "/:id",
    authMiddleware.authenticateUser,
    authMiddleware.checkRole(["admin"]),
    adminController.getUserById
  )
  .post(
    "/",
    authMiddleware.authenticateUser,
    authMiddleware.checkRole(["admin"]),
    adminController.createUser
  )
  .put(
    "/:id",
    authMiddleware.authenticateUser,
    authMiddleware.checkRole(["admin"]),
    adminController.updateUser
  )
  .delete(
    "/:id",
    authMiddleware.authenticateUser,
    authMiddleware.checkRole(["admin"]),
    adminController.deleteUser
  );

module.exports = router;
