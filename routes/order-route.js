const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order-controller");

// Routes for managing order items
router.post("/add", OrderController.addOrder);
router.get("/get", OrderController.getOrders);
router.put("/update/:id", OrderController.updateOrder);
router.delete("/delete/:id", OrderController.deleteOrder);

module.exports = router;
