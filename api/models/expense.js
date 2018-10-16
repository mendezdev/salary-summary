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
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);