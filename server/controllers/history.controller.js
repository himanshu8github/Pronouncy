import History from '../models/history.js';


export const addHistory = async (req, res) => {
    
  try {
    const { word } = req.body;

    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

    const newHistory = new History({
      user: req.user.id,   // comes from authMiddleware
      word,
    });

    await newHistory.save();

    res.status(201).json({ message: 'Word added to history', history: newHistory });
  } catch (error) {
    res.status(500).json({ error: 'Server error while adding history' });
  }
};


export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching history' });
  }
};
