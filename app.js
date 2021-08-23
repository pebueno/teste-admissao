// Node.js modules requirements
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");

// Routes
const users = require("./routes/api/users");

const app = express();

// Connect Database
connectDB();

// Cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// Accessing the path module
app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Use Routes
app.use("/api/users", users);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
