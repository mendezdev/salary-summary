const mongoose = require('mongoose');
const Account = require('../models/account');

exports.getAll = () => {
  return Account.find();
};

exports.getById = (id) => {
  return Account
    .findOne({ _id: id })
    .populate('spenders', 'username email')
    .exec();
};

exports.create = accountData => {
  const account = new Account({
    _id: new mongoose.Types.ObjectId(),
    ...accountData
  });

  return account.save();
};

exports.update = (id, updateOps) => {
  return Account.update(
    { _id: id },
    updateOps
  ).exec();
};