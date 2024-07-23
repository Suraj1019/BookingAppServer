const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const { connectDB } = require("./mongoConfig");
const userRoutes = require("./user/userRoutes");
const imageRoutes = require("./uploads/index");
const placeRoutes = require("./places/placeRoutes");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

connectDB();

app.use("/user", userRoutes);
app.use("/upload", imageRoutes);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/places", placeRoutes);

app.listen(PORT, () => {
  console.log(`App is listening at port => ${PORT}`);
});
