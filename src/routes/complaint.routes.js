const router = require("express").Router();
const {
  allcomplaints,
  del,
  actionTaken
} = require("../controllers/complaint.controller.js");

  router.get("/allcomplaints", allcomplaints);
  router.delete("/delete/:complaintId", del);
  router.post("/actiontaken/:complaintId", actionTaken)
  module.exports = router;
