const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const verifyToken = require("../middleware/verifyToken");

router.post("/process/:orderId", verifyToken, paymentsController.processPayments);
router.get("/order/:orderId", verifyToken, paymentsController.getPaymentsByOrder);

module.exports = router;
