const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  isWarden: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 15000,
  },
  phone: {
    type: Number,
    required: true,
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
  uid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Staff", staffSchema);
