const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // hashed password
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
