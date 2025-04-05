const express = require("express");
const router = express.Router();
const MailController = require("../controller/email-controller");

// Routes for send emails
router.post("/order_placed", MailController.EmailOrderPlaced); 

module.exports = router;
