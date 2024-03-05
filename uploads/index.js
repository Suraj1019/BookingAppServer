const express = require("express");
const router = express.Router();
const ImageDownloader = require("image-downloader");

const uploadImage = async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await ImageDownloader.image({
      url: link,
      dest: __dirname + "/" + newName,
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

console.log(__dirname);
router.post("/uploadByLink", uploadImage);

module.exports = router;
