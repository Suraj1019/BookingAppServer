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

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
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
