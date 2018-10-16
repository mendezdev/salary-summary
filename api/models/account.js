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
  spenders: [
    {
      information: {
        type: Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  expenses: [
    {
      type: Types.ObjectId,
      ref: 'Expense'
    }
  ]
});

module.exports = mongoose.model('Account', accountSchema);