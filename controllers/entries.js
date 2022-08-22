const express = require("express");

const waterRouter = express.Router();
const WaterEntry = require("../models/entry.js");

waterRouter.get("/", async (req, res) => {
  const waterEntries = await WaterEntry.find({
    //   date: { $gte: ISOD ISODate(`2020-03-01`), $lt: ISODate(`2021-04-01`) },
  }).exec();
  console.log("query", req.query);
  res.status(200).json(waterEntries);
});

// adding water to entry
waterRouter.post("/", async (req, res) => {
  console.log(req.body);
  const waterEntry = await WaterEntry.create({
    ...req.body,
    user_id: req.session.currentUser._id,
  });
  res.status(200).json(waterEntry);
});

WaterEntry.create({});

module.exports = waterRouter;
