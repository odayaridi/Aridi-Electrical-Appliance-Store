const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // <- read token from cookie
  if (!token) {
    return next(
      new HttpError("You are not logged in! Please log in to get access.", 401)
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new HttpError("Invalid token. Please log in again.", 403));
  }
};

module.exports = authenticateToken;
