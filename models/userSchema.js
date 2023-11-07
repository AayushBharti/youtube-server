const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
