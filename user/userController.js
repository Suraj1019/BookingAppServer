const user = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw new Error("User Already Exists");
    }

    const userDoc = await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.jwtSecret,
      { expiresIn: "1d" }
    );

    res.json({
      status: 201,
      message: "User Registered Successfully",
      data: {
        name: userDoc.name,
        email: userDoc.email,
        userId: userDoc._id,
        token: token,
      },
    });
  } catch (error) {
    res.json({
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
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.jwtSecret,
      { expiresIn: "1d" }
    );

    res.json({
      status: 200,
      message: "Logged in Successfully",
      data: {
        name: userDoc.name,
        email: userDoc.email,
        userId: userDoc._id,
        token: token,
      },
    });
  } catch (error) {
    res.json({
      status: error.status || 500,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

module.exports = { register, login };
