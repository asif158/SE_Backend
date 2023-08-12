const express = require("express");
const studentRoutes = require("./student.routes");
const staffRoutes = require("./staff.routes");
	const managerRoutes = require("./manger.routes");
	const complaintRoutes = require("./complaint.routes");
	const router = express.Router();
	const Hall = require("../models/hall.model.js");

	router.post("/hall", async (req, res) => {
		try {
			console.log(req.body);
			const { name, rooms } = req.body;

			const hall = Hall.create({ name, rooms });
			res.json({ hall });
		} catch (error) {
			console.log(error);
		}
	});

	router.use("/student", studentRoutes);
	router.use("/staff", staffRoutes);
	router.use("/manager", managerRoutes);
	router.use("/complaint", complaintRoutes);

module.exports = router;
