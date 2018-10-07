const mongoose, { Types }  = require('mongoose');

const spenderGroupSchema = mongoose.Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    maxLength: 40,
    required: true,
    unique: true
  },
  spenders: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('SpenderGroup', spenderGroupSchema);