const Staff = require("../models/staff.model.js");
const Student = require("../models/student.model.js")
const Complaint = require("../models/complaints.model.js");
const Hall = require("../models/hall.model.js");
const Manager = require("../models/manager.model.js")

module.exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const halls = await Hall.find();
    const rand = Math.floor(Math.random() * 1 + 1);
    const hall = halls[rand];
    const uid = "MM" + Math.floor(Math.random() * 9000 + 1000).toString();
    const manager = await Manager.create({
      name,
      phone,
      uid,
      password,
      hall,
    });

    if (manager) res.json({ message: "Manager registered", manager });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { uid, password } = req.body;
    const manager = await Manager.findOne({ uid: uid });
    if (manager) {
      if (manager.password !== password) {
        return res.json({ message: "password is wrong", status: false });
      }
      return res.json({
        message: "login sucessful",
        status: true,
        manager,
      });
    }
    return res.json({ message: "login unsucessful", status: false });
  } catch (error) {
    console.log(error);
  }
};

module.exports.studentMessDue = async(req,res) => {
  try{
    const {studentUid, messdue} = req.body
    const student = await Student.findOne({uid: studentUid})
    if(student){
      student.messdue = messdue;
      await student.save()
      res.json({message: `Mess due updated for student with id: ${studentUid}`, status: true, student})
    }else{
      res.json({message: "So such student exists"})
    }
  }catch(error){
    console.log(error)
    res.json({message: error.message, status: false})
  }
}

module.exports.totalMessDue = async (req, res) => {
  try {
    const {managerId }= req.params;
    const manager = await Manager.findById(managerId);
    const hall = await Hall.findById(manager.hall);
    const sum = hall.rooms.reduce((partialSum, i) => partialSum + i, 0);
    const total = sum * hall.messCharge;
    res.json({
      message: "Total Mess Due",
      status: true,
      totalMessDue: total,
      totalStudents: sum,
    });
  } catch (error) {
    console.log(error);
  }
};