const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
  phno: {
    type: Number,
    required: true,
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
  staffId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports =  mongoose.model("Admin", adminSchema);
