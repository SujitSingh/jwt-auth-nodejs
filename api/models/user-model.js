const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, requried: true },
  email: { type: String, requried: true, unique: true },
  password: { type: String, requried: true, select: true },
  creationDate: { type: Date, default: Date.now },
}, { versionKey: false });

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;