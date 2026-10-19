const { Types } = require("mongoose");
const place = require("./placeModel");

const addPlace = async (req, res) => {
  try {
    const data = await place.create({
      ...req.body,
      owner: new Types.ObjectId(req.body.owner),
    });
    res.status(201).json({
      message: "Place added",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
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

    res.status(200).json({
      message: "Ok",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const getPlaces = async (req, res) => {
  try {
    const q = req.query.q?.trim();

    // read and sanitise page and limit
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 8, 1), 50);
    const skip = (page - 1) * limit;

    let filter = {};
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      filter = { $or: [{ title: regex }, { address: regex }] };
    }

    const [data, total] = await Promise.all([
      place.find(filter).sort({ _id: -1 }).skip(skip).limit(limit),
      place.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      message: "Ok",
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      data: [],
    });
  }
};

const getPlace = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await place.findById(new Types.ObjectId(id));
    res.status(200).json({
      message: "Ok",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const updatePlace = async (req, res) => {
  const { id, ...body } = req.body;
  try {
    const data = await place.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({
      message: "Place updated",
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
