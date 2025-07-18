import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    word: {
      type: String,
      required: [true, 'Word is required'],
    },
    pronunciationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('History', historySchema);
export default History;
