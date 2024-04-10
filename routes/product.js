const express = require("express");
const router = express.Router()

const productController = require("../controller/product.controller");
const { validateSearch } = require("../middleware/validation/productValidation");

router.get("/getProduct", productController.getProduct)
router.get("/getProduct/:id", productController.getProductById)
router.post("/insertProduct", productController.insertProduct)
router.post("/search", validateSearch, productController.searchProduct)

module.exports = router;