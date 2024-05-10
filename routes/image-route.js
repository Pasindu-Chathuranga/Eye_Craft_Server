const express = require("express");
const router = express.Router();
const ImageController = require("../controller/image-controller");

// Routes for managing image items
router.post("/add", ImageController.addImageItem);
router.get("/get", ImageController.getImageItems);
router.put("/update/:id", ImageController.updateImageItem);
router.delete("/delete/:id", ImageController.deleteImageItem);

module.exports = router;
