const express = require("express");
const router = express.Router()

const authController = require("../controller/auth.controller")

router.post("/signup", authController.userSignup)
router.post("/login", authController.userLogin)
router.post("/admin-login", authController.adminLogin)

module.exports = router;