const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  phone: String,
  image: {
    type: String
  },
  role: {
    type: String,
  },
  activeUser: {
    type: Boolean,
    default: true
  }
});

module.exports = User = model("user", UserSchema);