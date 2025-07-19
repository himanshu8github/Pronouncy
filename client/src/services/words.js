import axios from "axios";

export const fetchPracticeWords = async () => {
  const res = await axios.get("/api/words");
  return res.data.words;
};
