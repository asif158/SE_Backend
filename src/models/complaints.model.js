const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema({
  body: {
    type: String,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
