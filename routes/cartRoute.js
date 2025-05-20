const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, cartController.getCart);
router.post("/add", verifyToken, cartController.addProduct);
router.put("/update", verifyToken, cartController.updateAmount);
router.delete("/delete/:productId", verifyToken, cartController.deleteProduct);

module.exports = router;
