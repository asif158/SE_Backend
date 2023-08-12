  const router = require("express").Router();
  const { register, login, totalMessDue, studentMessDue } = require("../controllers/manager.controller.js");

  router.post("/register", register);
  router.post("/login", login);
  router.get("/totalmessdue/:managerId", totalMessDue);
  router.post("/studentmessdue", studentMessDue);

  module.exports = router;
