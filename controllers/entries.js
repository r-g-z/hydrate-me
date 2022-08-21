const express = require("express");

const waterRouter = express.Router();
const WaterEntry = require("../models/entry.js");

waterRouter.get("/", async (req, res) => {
  const waterEntries = await WaterEntry.find({}).exec();
  console.log(waters);
  res.status(200).json(waterEntries);
});

// adding water to entry
waterRouter.post("/", async (req, res) => {
  console.log(req.body);
  res.status(200).json("");
});

module.exports = waterRouter;
