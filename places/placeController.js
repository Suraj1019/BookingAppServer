const { Types } = require("mongoose");
const place = require("./placeModel");

const addPlace = async (req, res) => {
  try {
    const data = await place.create({
      ...req.body,
      owner: new Types.ObjectId(req.body.owner),
    });
    res.json({
      status: 200,
      message: "Ok",
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

const getPlacesByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    const data = await place.find({
      owner: new Types.ObjectId(userId),
    });

    res.json({
      status: 200,
      message: "Ok",
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

const getPlaces = async (req, res) => {
  try {
    const data = await place.find();
    res.json({
      status: 200,
      message: "Ok",
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

const getPlace = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await place.findById(new Types.ObjectId(id));
    res.json({
      status: 200,
      message: "Ok",
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

const updatePlace = async (req, res) => {
  const { id, ...body } = req.body;
  try {
    const data = await place.findByIdAndUpdate(id, body, { new: true });
    res.json({
      status: 200,
      message: "Ok",
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

module.exports = {
  addPlace,
  getPlaces,
  getPlacesByUserId,
  getPlace,
  updatePlace,
};
