import express from "express";
const router = express.Router();

const userProgressData = {
  "himanshukakran8@gmail.com": {
    practiceSessions: 12,
    wordsPracticed: 45,
    accuracy: 82
  },
  "test@example.com": {
    practiceSessions: 5,
    wordsPracticed: 20,
    accuracy: 67
  }
};

router.get("/", (req, res) => {
  const email = req.query.email;
  const progress = userProgressData[email];

  if (!progress) {
    return res.status(404).json({ message: "Progress not found" });
  }

  res.json({ success: true, progress });
});

export default router;
