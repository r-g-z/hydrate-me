require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const entriesRouter = require("./controllers/entries");

const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;
const MongoDBStore = mongoDBSession(session);
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    name: "HydrateMeSession",
    proxy: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      httpOnly: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:5051", "https://hydrate-me-ui.herokuapp.com"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/users", usersRouter);
app.use("/entries", entriesRouter);

mongoose.connect(dbURL, () => {
  console.log("Connected to hydrate db");
});

app.listen(PORT, () => {
  console.log("🎉🎊", "Celebrations happening on port", PORT, "🎉🎊");
});
