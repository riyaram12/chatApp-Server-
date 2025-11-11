var express = require("express");
var router = express.Router();
const userController = require("../controller/userController.js");
const auth = require("../Middleware/auth.js");

/* GET users listing. */
router.post("/register", userController.createNewUser);
router.post("/login", userController.LoginUser);
router.get("/profile", auth.authenticate, userController.getProfile);
router.get("/all", userController.getAllUsers);
// Delete user by ID
router.post("/delete", auth.authenticate, userController.deleteUser);
router.post("/update", auth.authenticate, userController.updateUser);
router.get("/logout", auth.authenticate, userController.LogoutUser);
router.get("/search", auth.authenticate, userController.searchUsers);
router.get("/me", auth.authenticate, userController.getMe);
module.exports = router;
