const Complaint = require("../models/complaints.model.js");
const Hall = require("../models/hall.model.js");
const Student = require("../models/student.model.js");

module.exports.allcomplaints = async (req, res) => {
	try {
		const complaints = await Complaint.find()
			.populate({
				path: "studentId",
				select: "name",
			})
			.populate({ path: "hall", select: "name" });
		res.json({ message: "All complaints", status: "true", complaints });
	} catch (error) {
		console.log(error);
		res.json({ message: error.message, status: "false" });
	}
};

module.exports.del = async (req, res) => {
	try {
		const { complaintId } = req.params;
		console.log("COMPLAINID:", complaintId);
		const complaint = await Complaint.findById(complaintId);

		if (!complaint) {
			res.json({
				message: "No such complaint exists",
				status: true,
			});
		} else {
			await Hall.findByIdAndUpdate(complaint.hall, { $pull: { complaints: complaintId } });
			await Student.findByIdAndUpdate(complaint.studentId, { $pull: { complaints: complaintId } });
			await Complaint.findByIdAndDelete(complaintId);
			res.json({
				message: "complained Deleted/solved",
				status: true,
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ message: error.message, status: "false" });
	}
};
