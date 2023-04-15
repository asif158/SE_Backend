const Complaint = require("../models/complaints.model.js");

module.exports.allcomplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate({
      path: "studentId", select: "name"}).populate({ path: "hall", select: "name" })
    res.json({ message: "All complaints", status: "true", complaints });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: "false" });
  }
};

module.exports.del = async (req, res) => {
    try{
        const { complaintId } = req.params;
        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
          res.json({
            message: "No such complaint exists",
            status: true,
          });
        } else {
          await Complaint.findByIdAndDelete(complaintId);
          res.json({
            message: "complained Deleted/solved",
            status: true,
          });
        }
    }catch(error){
        console.log(error);
        res.jsin({message: error.message, status: "false"})
    }
}