const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, orderController.createOrder);
router.get("/", verifyToken, ordenController.getMyOrders);
router.get("/:id", verifyToken, orderController.getOrderById);

module.exports = router;
