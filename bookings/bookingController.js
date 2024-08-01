const { Types } = require("mongoose");
const booking = require("./bookingModel");

const bookPlace = async (req, res) => {
  try {
    const data = await booking.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      message: "Ok",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const getBookings = async (req, res) => {
  const { userId } = req.query;
  try {
    const pipeline = [
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "places",
          localField: "placeId",
          foreignField: "_id",
          as: "places",
        },
      },
      {
        $unwind: "$places",
      },
      {
        $addFields: {
          photos: "$places.photos",
          title: "$places.title",
        },
      },
      {
        $project: {
          places: 0,
        },
      },
    ];
    const data = await booking.aggregate(pipeline);
    res.status(200).json({
      status: 200,
      message: "Ok",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.query;
  try {
    const data = await booking.findById(new Types.ObjectId(bookingId));
    res.status(200).json({
      status: 200,
      message: "Ok",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

module.exports = {
  bookPlace,
  getBookings,
  getBookingDetails,
};
