const User = require("../model/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.json({ status: false });
    }
  } catch (err) {
    return res.json({ status: false });
  }
};
