const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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

module.exports = User = mongoose.model("users", UserSchema);
