const multer = require("multer");
const storage = multer.memoryStorage();
const uploadImage = multer({ storage });

module.exports = {
  image: uploadImage.single("image"),
};
