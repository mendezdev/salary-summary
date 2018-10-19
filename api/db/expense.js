const mongoose = require('mongoose');
const Expense = require('../models/expense');

exports.create = expenseData => {
  const expense = new Expense({
    _id: new mongoose.Types.ObjectId(),
    ...expenseData
  });

  return expense.save();
};

exports.getByAccountId = (accountId) => {
  return Expense.find({ accountId });
};