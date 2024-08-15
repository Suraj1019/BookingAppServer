const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.send({
        status: 401,
        message: "Authorization token is missing",
      });
    }
    jwt.verify(token, process.env.jwtSecret);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.send({
        status: 401,
        message: "Token expired login again",
      });
    } else {
      return res.send({
        status: 401,
        message: "Invalid token",
      });
    }
  }
};

module.exports = auth;
