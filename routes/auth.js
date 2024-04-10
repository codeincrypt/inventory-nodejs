const express = require("express");
const router = express.Router()

const authController = require("../controller/auth.controller");
const { validateSignup, validateLogin } = require("../middleware/validation/authValidation");

router.post("/signup", validateSignup, authController.userSignup)
router.post("/login", validateLogin, authController.userLogin)
router.post("/admin-login", authController.adminLogin)

module.exports = router;