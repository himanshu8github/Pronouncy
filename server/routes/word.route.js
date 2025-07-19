
import express from "express";
const router = express.Router();

const words = [
  "hello",
  "world",
  "pronunciation",
  "developer",
  "react",
  "javascript",
  "microphone",
];

router.get("/", (req, res) => {
  res.json({ success: true, words });
});

export default router;
