const Staff = require("../models/staff.model.js");
const Complaint = require("../models/complaints.model.js");
const Hall = require("../models/hall.model.js");
const Student = require("../models/student.model.js");

module.exports.register = async (req, res) => {
	try {
		const { name, phone, password } = req.body;
		const halls = await Hall.find();
		const rand = Math.floor(Math.random() * 2 + 1);
		const hall = halls[rand];
		const uid = "SS" + Math.floor(Math.random() * 9000 + 1000).toString();
		const staff = await Staff.create({
			name,
			phone,
			uid,
			password,
			hall,
		});

		if (staff) res.json({ message: "Staff registered", staff });
	} catch (error) {
		console.log(error);
	}
};

module.exports.wardenRegister = async (req, res) => {
	try {
		const { name, phone, password } = req.body;
		const halls = await Hall.find();
		const rand = Math.floor(Math.random() * 2 + 1);
		const hall = halls[rand];
		const uid = "SW" + Math.floor(Math.random() * 9000 + 1000).toString();
		const staff = await Staff.create({
			name,
			phone,
			uid,
			password,
			hall,
		});
		staff.isWarden = true;
		await staff.save();
		if (staff) res.json({ message: "Staff registered as Warden", staff });
	} catch (error) {
		console.log(error);
	}
};

module.exports.login = async (req, res) => {
	try {
		const { uid, password } = req.body;
		const staff = await Staff.findOne({ uid: uid }).populate({
			path: "hall",
			populate: { path: "complaints", populate: "studentId" },
		});
		if (staff) {
			if (staff.password !== password) {
				return res.json({ message: "password is wrong", status: false });
			}
			return res.json({
				message: "login sucessful",
				status: true,
				staff,
			});
		}
		return res.json({ message: "login unsucessful", status: false });
	} catch (err) {
		console.log(err);
	}
};

module.exports.del = async (req, res) => {
	try {
		const { staffId } = req.params;
		const staff = await Staff.findById(staffId);

		if (!staff) {
			res.json({ message: "Staff deos not exist with this uid", status: true });
		} else {
			await Staff.findByIdAndDelete(staffId);
			res.json({
				message: "Staff Deleted",
				status: true,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports.showHall = async (req, res) => {
	try {
		const { staffId } = req.params;
		const staff = await Staff.findById(staffId);
		if (staff.isWarden) {
			const hall = await Hall.findById(staff.hall);
			const rooms = hall.rooms;
			res.json({ message: "Room Status", status: true, rooms });
		} else {
			res.json({ message: "you dont have permission", status: false });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: error.message, status: false });
	}
};

module.exports.getStaff = async (req, res) => {
	try {
		const staffId = req.params.id;
		const staff = await Staff.findById(staffId).populate({ path: "hall", populate: { path: "complaints" } });
		if (staff) {
			res.json({ message: "Student Details", status: true, staff });
		} else {
			res.json({ message: "No user found", status: false });
		}
	} catch (error) {}
};
