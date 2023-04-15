const router = require("express").Router();
const {register, login, del, wardenRegister, showHall} = require("../controllers/staff.controller.js");

router.post("/register", register);
router.post("/warden/register", wardenRegister);
router.post("/warden/showhall/:staffId", showHall);
router.post("/login", login);
router.delete("/delete/:staffId", del);

module.exports = router;
