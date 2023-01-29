const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  username: {
    type: String
  },
  body: {
    type: String
  },
})

module.exports = mongoose.model('Messages', MessagesSchema)