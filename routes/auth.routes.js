const { Router } = require("express");
const bcrypt = require("bcryptjs");
const 
const User = require("../models/User");
const router = Router();

// api/auth
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: "This user exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong on api/auth" });
  }
});

// api/login
router.post("/login", async (req, res) => {});

module.exports = router;
