const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");
const ImageDownloader = require("image-downloader");
const fs = require("fs");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer setup (memory storage for stream upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: `uploads/${filename.split(".")[0]}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Upload by link
const uploadImageByLink = async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    const localPath = __dirname + "/" + newName;
    await ImageDownloader.image({ url: link, dest: localPath });

    const fileBuffer = fs.readFileSync(localPath);
    const imageUrl = await uploadToCloudinary(fileBuffer, newName);

    fs.unlinkSync(localPath); // Clean up local temp file

    res.json({
      status: 201,
      message: "Image Uploaded",
      data: { url: imageUrl },
    });
  } catch (error) {
    res.status(500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

// Upload via multipart form
const uploadImage = async (req, res) => {
  try {
    const files = req.files;
    const urls = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file.buffer, file.originalname);
      urls.push(url);
    }

    res.json({
      status: 201,
      message: "Images Uploaded",
      data: urls,
    });
  } catch (error) {
    res.status(500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

router.post("/uploadByLink", uploadImageByLink);
router.post("/", upload.array("photos", 100), uploadImage);

module.exports = router;
