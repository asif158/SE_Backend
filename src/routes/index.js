const express = require("express");
const studentRoutes = require("./student.routes");
const staffRoutes = require("./staff.routes")
const managerRoutes = require("./manger.routes")
const complaintRoutes = require("./complaint.routes")
const router = express.Router();

router.use("/student", studentRoutes);
router.use("/staff", staffRoutes);
router.use("/manager", managerRoutes);
router.use("/complaint", complaintRoutes)

module.exports = router;
