const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/users");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

  try {
    const user = await User.create(req.body);
    req.session.currentUser = user;
    res.status(200).json({
      msg: "You have successfully registered",
      authorised: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (e) {
    console.log("Error");
    res.status(400).json({
      msg: "Username already exists",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ username: username }).exec();

  if (!user) {
    // User not found
    return res.status(400).json({
      msg: "Username or password is incorrect",
    });
  }

  const passwordIsCorrect = bcrypt.compareSync(password, user.password);

  if (!passwordIsCorrect) {
    // Passwords don't match
    return res.status(400).json({
      msg: "Username or password is incorrect",
    });
  } else {
    console.log("logged in succesfully");
    req.session.currentUser = user;
    console.log(req.session.currentUser);
    res.status(200).json({
      msg: "You have logged in successfully",
      authorised: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  }
});

userRouter.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    // Logged out
    res.status(200).json({
      msg: "User is logged out",
    });
  });
});

userRouter.get("/isauthorised", async (req, res) => {
  console.log("is authorised route");
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return res.status(200).json({
      msg: "User is logged in",
      authorised: true,
      user: {
        id: req.session.currentUser._id,
        username: req.session.currentUser.username,
      },
    });
  } else {
    return res.status(200).json({
      msg: "User is logged out",
      authorised: false,
    });
  }
});

module.exports = userRouter;
