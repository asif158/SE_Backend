const router = require("express").Router();
const {
  allcomplaints,
  del,
} = require("../controllers/complaint.controller.js");

router.get("/allcomplaints", allcomplaints);
router.delete("/delete/:complaintId", del);

module.exports = router;
