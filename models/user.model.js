const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    displayName: String,
    name: String,
    email: String,
    googleId: String,
  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;