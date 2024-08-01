const express = require("express");
const router = express.Router();
const ImageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const uploadImageByLink = async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await ImageDownloader.image({
      url: link,
      dest: __dirname + "/" + newName,
    });

    res.json({
      status: 201,
      message: "Image Uploaded",
      data: {
        newName: newName,
      },
    });
  } catch (error) {
    res.json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const photoMiddleware = multer({ dest: "uploads" });
const uploadImage = async (req, res) => {
  try {
    const files = req.files;
    console.log(req.files);
    const data = [];
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].originalname.split(".")[1];
      const { path } = files[i];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      data.push(newPath.replace("uploads\\", ""));
    }
    res.json({
      status: 201,
      message: "Image Uploaded",
      data: data,
    });
  } catch (error) {
    res.json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

router.post("/uploadByLink", uploadImageByLink);
router.post("/", photoMiddleware.array("photos", 100), uploadImage);

module.exports = router;
