import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
  withCredentials: true, 
});

// Signup API
export const signupUser = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};

// Login API
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};
