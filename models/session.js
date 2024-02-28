const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'company',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Session', SessionSchema);
