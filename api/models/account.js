const mongoose, { Types } = require('mongoose');

const accountSchema = mongoose.Schema({
  _id: Types.ObjectId,
  ammount: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  spenderGroup: {
    type: Types.ObjectId,
    ref: 'SpenderGroup',
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);