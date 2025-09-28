const Router = require("express");
const User = require("../models/user");
const { createTokenForUser } = require("../Services/authentication");
const router = Router();

// Register student
router.post("/students", async (req, res) => {
  try {
    const { Fullname, Email, Phoneno, Semester, password } = req.body;
    const student = await User.create({ Fullname, Email, Phoneno, Semester, password });
    const safe = { _id: student._id, Fullname: student.Fullname, Email: student.Email, role: student.role };
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { Email, password } = req.body;
    const user = await User.matchedPasswordAndGenerateToken(Email, password); // returns user if ok
    const token = createTokenForUser(user);
    // set cookie for SPA (httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with https
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ message: "Logged in", user: { id: user._id, Fullname: user.Fullname, Email: user.Email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Get current user
const { requireAuth, requireAdmin } = require('../middleware/auth');
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list students (admin)
router.get("/students", requireAdmin, async (req, res) => {
  const students = await User.find().select('-password');
  res.json(students);
});

module.exports = router;
