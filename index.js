const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const { connectDB } = require("./mongoConfig");
const userRoutes = require("./user/userRoutes");
const imageRoutes = require("./uploads/index");
const placeRoutes = require("./places/placeRoutes");
const bookingRoutes = require("./bookings/bookingRoutes");
const auth = require("./auth");

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://accommodation-booking-app.netlify.app",
    ],
  }),
);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/upload", imageRoutes);
app.use("/places", placeRoutes);
app.use("/bookings", auth, bookingRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`App is listening at port => ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
