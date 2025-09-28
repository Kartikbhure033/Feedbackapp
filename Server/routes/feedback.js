const Router = require("express");
const Feedback = require("../models/feedback");
const User = require("../models/user");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const router = Router();

// create feedback: normal user can create for self; admin can pass userId in body to create on behalf
router.post("/feedback", requireAuth, async (req, res) => {
  try {
    const { likes, Improve, rating, comments, userId } = req.body;
    // decide which user id to attach
    let attachUserId = req.user.id;
    if (req.user.role === 'admin' && userId) {
      const student = await User.findById(userId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      attachUserId = userId;
    }

    const feedback = await Feedback.create({
      likes, Improve, rating, comments, user: attachUserId
    });
    return res.json(feedback);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

// admin-only list of feedbacks
router.get("/feedback", requireAdmin, async (req, res) => {
  const feedback = await Feedback.find().populate("user", "Fullname Email");
  return res.json(feedback);
});

module.exports = router;
