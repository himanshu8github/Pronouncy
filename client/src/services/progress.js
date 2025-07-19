import axios from "axios";

export const fetchUserProgress = async (email) => {
  const res = await axios.get(`/api/progress?email=${encodeURIComponent(email)}`);
  return res.data.progress;
};
