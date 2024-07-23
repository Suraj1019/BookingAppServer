const { Types } = require("mongoose");
const place = require("./placeModel");

const addPlace = async (req, res) => {
  try {
    const data = await place.create({
      ...req.body,
      owner: new Types.ObjectId(req.body.owner),
    });
    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPlaces = async (req, res) => {
  const { userId } = req.query;
  try {
    const data = await place.find({
      owner: new Types.ObjectId(userId),
    });
    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPlace = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await place.findById(new Types.ObjectId(id));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePlace = async (req, res) => {
  const { id, ...body } = req.body;
  try {
    const data = await place.findByIdAndUpdate(id, body, { new: true });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPlace, getPlaces, getPlace, updatePlace };
