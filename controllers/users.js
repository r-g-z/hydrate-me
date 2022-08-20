const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/users");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  console.log(req.body);
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

userRouter.put("/onboard", async (req, res) => {
  console.log(req.body);

  // weight * 0.033
  // light + 350
  // medium + 500
  // intense 700

  let daily_goal = parseInt(req.body.weight) * 33;
  switch (req.body.exercise) {
    case "Light":
      daily_goal += 350;
      break;
    case "Medium":
      daily_goal += 500;
      break;
    case "Intense":
      daily_goal += 700;
      break;
    default:
      console.log("Drink more");
  }

  const user = await User.findOneAndUpdate(
    {
      _id: req.session.currentUser._id,
    },
    { ...req.body, daily_goal }
  ).exec();
  console.log(user);
  return res.status(200);
});

module.exports = userRouter;
