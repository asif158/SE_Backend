const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
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
  messdue: {
    type: Number,
    default: 0,
  },
  halldue: {
    type: Number,
    default: 0
  },
  room: {
    type: Number,
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
  },
  password: {
    type: String,
    required: true,
  },
  complaints: [
    {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
