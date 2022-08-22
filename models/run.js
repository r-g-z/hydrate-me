// require("dotenv").config();
// console.log("water");
// const mongoose = require("mongoose");

// const Review = require("../models/entry.js");
// const User = require("../models/users");
// const data = require("./entry.json");

// const dbURL = process.env.MONGODB_URL;

// mongoose.connect(dbURL, async () => {
//   console.log("Connected to entries db");
//   const check = await User.findOne();
//   console.log("Resetting entries collection");
//   await Review.collection.drop();
//   console.log("Entries collection dropped");
//   const newUser = data.map((data) => {
//     data.user_id = check._id;
//     return data;
//   });
//   console.log(newUser);
//   console.log("Inserting seed data");
//   const insertedReviews = await Review.insertMany(newUser);
//   console.log("Entry inserted");
//   console.log(insertedEntries);

//   mongoose.connection.close();
// });
