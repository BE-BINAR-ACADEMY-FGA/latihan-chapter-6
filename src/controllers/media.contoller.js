const qr = require("node-qr-image");
const imagekit = require("../lib/imagekit");

const storageImage = (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/image/${
    req.file.filename
  }`;

  return res.json({
    status: true,
    message: "File uploaded successfully",
    data: {
      imageUrl,
    },
  });
};

const storageVideo = (req, res) => {
  const videoUrl = `${req.protocol}://${req.get("host")}/video/${
    req.file.filename
  }`;

  return res.json({
    status: true,
    message: "File uploaded successfully",
    data: {
      videoUrl,
    },
  });
};

const storageFile = (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/file/${
    req.file.filename
  }`;

  return res.json({
    status: true,
    message: "File uploaded successfully",
    data: {
      fileUrl,
    },
  });
};

const generateQRCode = (req, res) => {
  const { message } = req.query;

  const qr_png = qr.image(message, { type: "png" });
  qr_png.pipe(
    require("fs").createWriteStream(`./public/qr/${message}.png`.toLowerCase())
  );

  const qrUrl = `${req.protocol}://${req.get("host")}/qr/${message}.png`;

  return res.json({
    status: true,
    message: "QR code generated successfully",
    data: {
      qrUrl,
    },
  });
};

const imageKitUpload = async (req, res) => {
  try {
    const stringFile = req.file.buffer.toString("base64");

    const uploadFile = await imagekit.upload({
      fileName: req.file.originalname,
      file: stringFile,
    });

    return res.status(200).json({
      status: true,
      message: "File uploaded successfully",
      data: {
        imageUrl: uploadFile.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  storageImage,
  storageVideo,
  storageFile,
  generateQRCode,
  imageKitUpload,
};
