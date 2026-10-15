const user = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const error = new Error("User Already Exists");
      error.status = 409;
      throw error;
    }

    const userDoc = await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.jwtSecret,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User Registered Successfully",
      data: {
        name: userDoc.name,
        email: userDoc.email,
        userId: userDoc._id,
        token: token,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await user.findOne({ email });
    if (!userDoc) {
      const error = new Error("User does not exist");
      error.status = 404;
      throw error;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect Password");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.jwtSecret,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Logged in Successfully",
      data: {
        name: userDoc.name,
        email: userDoc.email,
        userId: userDoc._id,
        token: token,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

module.exports = { register, login };
