const mongoose = require("mongoose");

const hallSchema = mongoose.Schema({
  name: {
    type: String,
  },
  roomCharge: {
    type: Number,
    default: 10000,
  },
  messCharge: {
    type: Number,
    default: 5000,
  },
  rooms: [{ type: Number, default: 0 }],
  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
});

module.exports = mongoose.model("Hall", hallSchema);
