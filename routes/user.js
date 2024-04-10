const express = require("express");
const router = express.Router()

const userController = require("../controller/user.controller")
const orderController = require("../controller/orders.controller")

const {requireUserLogin} = require('../middleware/auth/requireLogin');

router.get("/profile", requireUserLogin, userController.getUserProfile)
router.get("/order", requireUserLogin, orderController.getMyOrders)
router.get("/order/:id", requireUserLogin, orderController.getMyOrderView)
router.post("/createOrder", requireUserLogin, orderController.createNewOrder)

module.exports = router;