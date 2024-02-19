const express = require("express");
const cors = require('cors')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const { connectDB } = require("./mongoConfig");
const userRoutes = require('./user/userRoutes');

connectDB();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use('/user', userRoutes);

console.log("git test")
app.listen(PORT, () => {
    console.log(`App is listening at port => ${PORT}`)
})