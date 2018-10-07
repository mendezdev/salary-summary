const mongoose = require('mongoose');

const spenderGroupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    maxLength: 40,
    required: true,
    unique: true
  },
  spenders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('SpenderGroup', spenderGroupSchema);