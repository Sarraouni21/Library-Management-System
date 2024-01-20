const User = require("../model/user.model");
const { createSecretToken } = require("../util/SecretToken");
const { userVerification } = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs");

module.exports.Signup =
  ("/signup",
  async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
      });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        message: "User signed in successfully",
        success: true,
        user,
        token: token,
      });
      next();
    } catch (error) {
      console.error(error);
    }
  });

module.exports.Login =
  ("/login",
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      userVerification(req, res, next);

      res
        .status(201)
        .json({
          message: "User logged in successfully",
          success: true,
          user,
          token: token,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });