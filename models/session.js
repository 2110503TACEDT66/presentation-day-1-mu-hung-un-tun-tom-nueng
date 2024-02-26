const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, `Please add your user id`],
  },
  company_id: {
    type: String,
    required: [true, `Please add company id`],
  },
  date: {
    type: Date,
    required: [true, `Please add session's date`],
  },
});

module.exports = mongoose.model('Session', SessionSchema);
