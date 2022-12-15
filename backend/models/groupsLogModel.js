const mongoose = require('mongoose');

const groupsLogSchema = mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  participantId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('groupsLog', groupsLogSchema);
