const router = require("express").Router();
const {login, register, makeComplaint, getStudent} = require("../controllers/student.controller.js")


router.post("/register", register);
router.post("/login", login);
router.post("/makecomplaint/:id", makeComplaint);
router.get("/:id", getStudent);


module.exports = router;