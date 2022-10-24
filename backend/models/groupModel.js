const mongoose = require('mongoose');

const subSchema = mongoose.Schema({
  number: {
    type: Number,
  },
});

const groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serialized: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [subSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Group', groupSchema);
