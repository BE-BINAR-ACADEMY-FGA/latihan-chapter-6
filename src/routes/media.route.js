const express = require("express");
const router = express.Router();
const storage = require("../lib/multer");
const multer = require("multer")();

const {
  storageImage,
  storageVideo,
  storageFile,
  generateQRCode,
  imageKitUpload,
} = require("./../controllers/media.contoller");

router.post("/image", storage.image.single("image"), storageImage);
router.post("/video", storage.video.single("video"), storageVideo);
router.post("/file", storage.file.single("file"), storageFile);
router.post("/qr", generateQRCode);

router.post("/imagekit", multer.single("image"), imageKitUpload);
module.exports = router;
