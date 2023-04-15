const Student = require("../models/student.model.js");
const Complaint = require("../models/complaints.model.js");
const Hall = require("../models/hall.model.js");

module.exports.register = async (req, res) => {
  try {
    const { name, address, phone, password } = req.body;

    const halls = await Hall.find();
    const rand = Math.floor(Math.random() * 1 + 1);
    const hall = halls[rand];
    console.log(hall);
    const sum = hall.rooms.reduce((partialSum, i) => partialSum + i, 0);
    hall.rooms[sum] = 1;
    hall.save();
    const uid = "ST" + Math.floor(Math.random() * 9000 + 1000).toString();
    const student = await Student.create({
      name,
      address,
      phone,
      uid,
      password,
      hall,
      room: sum,
      messdue: 16000,
      halldue: 15000,
    });

    if (student) res.json({ message: "Student registered", student });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  const { uid, password } = req.body;
  const student = await Student.findOne({ uid: uid });
  console.log(student);
  if (student) {
    if (student.password !== password) {
      return res.json({ message: "password is wrong", status: false });
    }
    console.log(student);
    return res.json({
      message: "login sucessful",
      status: true,
      student,
    });
  }
  return res.json({ message: "login unsucessful", status: false });
};

module.exports.makeComplaint = async (req, res) => {
  try {
    const studentId = req.params.id;
    const body = req.body.body;
    const student = await Student.findById(studentId);
    const hallId = student.hall;
    const hall = await Hall.findById(hallId);
    const complaint = await Complaint.create({
      body,
      hall,
      studentId,
    });

    if (complaint) {
      student.complaints.push(complaint._id);
      hall.complaints.push(complaint._id);
      student.save();
      hall.save();
      res.json({ message: "complaint created sucessfully", status: true , complaint});
    } else {
      res.json({
        mesage: "Something went wrong",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ mesage: "complaint unsucessful", status: false });
  }
};

module.exports.getStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate({
      path: "hall",
    });
    if (student) {
      res.json({ message: "Student Details", status: true, student });
    } else {
      res.json({ message: "No user found", status: false });
    }
  } catch (error) {
    console.log(error);
  }
};