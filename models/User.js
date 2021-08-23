const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
