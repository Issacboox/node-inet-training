var express = require("express");
var router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
/* GET users listing. */
router.get("/",async function (req, res, next) {
  try {
    const users = await Users.find();
    return res.status(200).send({
      data: users,
      message:'success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({
      message:'fail',
      success: false,
    })
  }
});

router.post("/", async function (req, res, next) {
  try {
    let { password, username, firstName, lastName, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      password: hashPassword,
      username,
      firstName,
      lastName,
      email,
    });
    const user = await newUser.save();
    return res.status(200).send({
      data:{_id: user._id, username, firstName, lastName, email},
      message:'craete success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({
      message:'craete fail',
      success: false,
    })
  }
});

router.put("/", function (req, res, next) {
  res.send("Method Put");
});

router.delete("/", function (req, res, next) {
  res.send("Method Delete");
});

module.exports = router;
