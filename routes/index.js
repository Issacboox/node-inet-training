var express = require("express");
var router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let user = await Users.findOne({ username: username });
    if (!user) {
      return res.status(500).send({
        message: "User not found",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "Login failed",
        success: false,
      });
    }
    const { _id, firstName, lastName, email } = user;
    return res.status(201).send({
      data:{ _id, firstName, lastName, email},
      message: "Login Success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Login Error',
      success: false,
    })
  }
});

module.exports = router;
