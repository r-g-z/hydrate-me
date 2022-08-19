const express = require("express");

const watersRouter = express.Router();
const Water = require("../models/entry.js");

reviewsRouter.get("/", async (req, res) => {
  const waters = await Waterfind({}).exec();
  console.log(waters);
  res.status(200).json(waters);
});
