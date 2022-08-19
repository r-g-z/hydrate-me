const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waterEntrySchema = new Schema({
  user_id: { type: String },
  date: { type: Date },
  waterAmount: { type: Number, min: 0, max: 8, default: 0 },
});

const Entry = mongoose.model("Entry", waterEntrySchema);

module.exports = Entry;
