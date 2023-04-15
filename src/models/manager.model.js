const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const managerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  uid: {
    type: String,
    unique: true,
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 15000,
  },
});
module.exports = mongoose.model("Manager", managerSchema);