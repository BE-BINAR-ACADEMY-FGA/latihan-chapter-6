const multer = require("multer");
const path = require("path");

const filename = (req, file, cb) => {
  const filename = Date.now() + "-" + file.originalname;
  cb(null, filename);
};

const generateStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename,
  });
};

module.exports = {
  image: multer({
    storage: generateStorage("./public/image"),
    fileFilter: (req, file, cb) => {
      const allowedMineType = ["image/png", "image/jpg", "image/jpeg"];

      if (allowedMineType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const err = new Error(`Only ${allowedMineType.join(", ")} are allowed`);
        cb(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),

  video: multer({
    storage: generateStorage("./public/video"),
    fileFilter: (req, file, cb) => {
      const allowedMineType = [
        "video/mp4",
        "video/x-msvideo",
        "video/quicktime",
      ];

      if (allowedMineType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const err = new Error(`Only ${allowedMineType.join(", ")} are allowed`);
        cb(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),

  file: multer({
    storage: generateStorage("./public/file"),
    fileFilter: (req, file, cb) => {
      const allowedMineType = ["application/pdf"];

      if (allowedMineType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const err = new Error(`Only ${allowedMineType.join(", ")} are allowed`);
        cb(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),
};
