const { Types } = require("mongoose");
const booking = require("./bookingModel");

const bookPlace = async (req, res) => {
  try {
    const data = await booking.create({
      ...req.body,
    });
    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.query;
  try {
    const data = await booking.findById(new Types.ObjectId(bookingId));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookPlace,
  getBookings,
  getBookingDetails,
};
