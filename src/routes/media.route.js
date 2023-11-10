const express = require("express");
const router = express.Router();
const storage = require("../lib/multer");
const multerMiddleware = require("../lib/multerWithImagekit");
const multer = require("multer")();

const {
  storageImage,
  storageVideo,
  storageFile,
  generateQRCode,
  imageKitUpload,
  multerWithImagekit,
} = require("./../controllers/media.contoller");

// router.post("/image", storage.image.single("image"), storageImage);
router.post("/image", multerMiddleware.image, multerWithImagekit);
router.post("/video", storage.video.single("video"), storageVideo);
router.post("/file", storage.file.single("file"), storageFile);
router.post("/qr", generateQRCode);

router.post("/imagekit", multer.single("image"), imageKitUpload);
module.exports = router;
