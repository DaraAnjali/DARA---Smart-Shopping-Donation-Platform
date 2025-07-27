// models/DonationCode.js
const mongoose = require('mongoose');

const DonationCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: String, required: true },  // could be email or MongoDB _id
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DonationCode', DonationCodeSchema);
