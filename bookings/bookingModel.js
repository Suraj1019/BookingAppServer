const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Place ID is required"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "User ID is required"],
  },
  checkIn: {
    type: Date,
    required: [true, "Check-in date is required"],
  },
  checkOut: {
    type: Date,
    required: [true, "Check-out date is required"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
