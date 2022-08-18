require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, () => {
  console.log("Connected to hydrate db");
});

app.listen(PORT, () => {
  console.log("🎉🎊", "Celebrations happening on port", PORT, "🎉🎊");
});
