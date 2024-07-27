const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  placeId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userName: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: Number, required: true },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
