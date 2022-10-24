const mongoose = require('mongoose');
require('../helpers/israelOffset');

const messageSchema = mongoose.Schema({
  message: {
    type: Object,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('MessageInGroup', messageSchema);
