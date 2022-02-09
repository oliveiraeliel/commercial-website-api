const User = require("../models/User");
const router = require("express").Router();
const md5 = require("md5");

router.post("/", async (req, res) => {
  const { name, fullName, email, _password } = req.body;

  const password = md5(_password);
  const user = { name, fullName, email, password };

  try {
    const user = await User.create(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, _password } = req.body;
  const password = md5(_password);
  const user = { email, password };

  try {
    const loginVerify = await User.findOne(user);
    if (!loginVerify) {
      res.status(422).json({ message: ":C" });
      return;
    }
    res.status(200).json(loginVerify);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
