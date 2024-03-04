const user = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.json({
          name: userDoc.name,
          email: userDoc.email,
          token: token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await user.findOne({ email });
    if (userDoc) {
      const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
      if (isPasswordCorrect) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          process.env.jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.json({
              name: userDoc.name,
              email: userDoc.email,
              token: token,
            });
          }
        );
      } else {
        res.status(422).json({ error: "incorrect password" });
      }
    } else {
      res.status(404).json({ error: "user does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
