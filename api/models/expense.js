const mongoose, { Types } = require('mongoose');

const expenseSchema = mongoose.Schema({
  _id: Types.ObjectId,
  ammount: {
    type: Number,
    min: [0, 'The value must be bigger than zero'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  isActive: Boolean,
  date: {
    type: Date,
    required: true
  },
  accountId: {
    type: Types.ObjectId,
    ref: 'Account',
    required: true
  },
  userInformation: {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    required: true
  }
});

module.exports = mongoose.model('Expense', expenseSchema);