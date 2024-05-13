const place = require("./placeModel");

const addPlace = async (req, res) => {
  try {
    const data = await place.create(req.body);
    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPlace };
