const express = require("express");
const router = express.Router()

const adminController = require("../controller/admin.controller")
const orderController = require("../controller/orders.controller")

const {requireUserLogin, requireAdminLogin} = require('../middleware/auth/requireLogin');

router.get("/profile", requireUserLogin, adminController.getUserProfile)
router.get("/user/:id/orders", requireAdminLogin, orderController.getOrdersByUserId)
router.get("/user/:id/orders/:orderid", requireAdminLogin, orderController.getOrderViewByUserId)
router.get("/analytics/top-products", requireAdminLogin, orderController.getTopProducts)
router.get("/analytics/top-users", requireUserLogin, orderController.getTopUsers)

module.exports = router;