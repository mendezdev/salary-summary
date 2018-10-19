const mongoose = require('mongoose');
const User = require('../models/user');

exports.saveUser = userData => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...userData
  });
  return user.save();
};

exports.getAll = () => {
  return User.find();
};

exports.getUserByEmail = email => {
  return User.findOne({ email });
};