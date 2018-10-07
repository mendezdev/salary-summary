const mongoose, { Types } = require('mongoose');

const account = mongoose.Schema({
  _id: Types.ObjectId,
  ammount: {
    type: Number,
    default: 0
  },
  spenderGroup: {
    type: Types.ObjectId,
    ref: 'SpenderGroup',
    required: true
  }
})