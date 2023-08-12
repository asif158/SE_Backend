	const mongoose = require("mongoose");

	const complaintSchema = mongoose.Schema(
		{
			body: {
				type: String,
			},
			studentId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Student",
			},
			studentName: {
				type: String,
			},
			hall: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Hall",
			},
			actionTaken: {
				type: String,
			}
		},
		{ timestamps: true }
	);

	module.exports = mongoose.model("Complaint", complaintSchema);
