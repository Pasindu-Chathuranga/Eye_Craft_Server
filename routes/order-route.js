const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order-controller");

// Routes for managing order items
router.post("/add", OrderController.addOrderItem);
router.get("/get", OrderController.getOrderItems);
router.put("/update/:id", OrderController.updateOrderItem);
router.delete("/delete/:id", OrderController.deleteOrderItem);

module.exports = router;
