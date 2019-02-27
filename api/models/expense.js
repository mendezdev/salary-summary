const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: {
    type: Number,
    min: [0, 'The value must be bigger than zero'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);