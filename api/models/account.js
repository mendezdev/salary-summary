const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ]
});

module.exports = mongoose.model('Account', accountSchema);