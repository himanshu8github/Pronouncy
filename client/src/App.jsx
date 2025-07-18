import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";         // ✅ Make sure this is added
import Signup from "./pages/Signup";       // ✅ Same here
// import Dashboard from "./pages/Dashboard"; // ✅ If you're using dashboard
// import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  
  );
};

export default App;
