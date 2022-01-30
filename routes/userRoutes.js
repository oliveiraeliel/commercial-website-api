const User = require("../models/User");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name, fullName, email, password } = req.body;
  const user = { name, fullName, email, password };

  try {
    await User.create(user);
    res.status(201).json({ message: "User has been created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
