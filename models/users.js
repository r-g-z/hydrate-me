const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Female", "Male"] },
  weight: { type: Number },
  exercise: { type: String, enum: ["Light", "Medium", "Intense"] },
  daily_goal: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
