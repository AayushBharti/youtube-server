const express = require("express");

const authRouter = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authMiddleware = require("./authMiddleware");

authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  await newUser.save();
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    "mysecretkey"
  );
  res.send({
    success: true,
    token: token,
  });
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    // create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      "mysecretkey"
    );
    res.send({
      success: true,
      token: token,
    });
  } else {
    res.send({
      authorized: false,
    });
  }
});

authRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const id = user.id;
    const userData = await User.findById(id);
    await userData.populate("videos");
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = authRouter;