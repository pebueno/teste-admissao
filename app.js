// Node.js modules requirements
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
// const connectDB = require("./config/db");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require("path");
var cors = require("cors");

// Routes
const users = require("./routes/api/users");

const app = express();

// Connect Database
// connectDB();
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-rapidapi-key");
  next();
});

// Cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Accessing the path module
app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Init Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
