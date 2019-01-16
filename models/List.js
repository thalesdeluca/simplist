const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  user: String,
  title: String,
  tasks: [{
    checked: false,
    message: String
  }],
});

mongoose.model('list', listSchema);