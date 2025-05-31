// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import Analytics from './pages/Analytics';
import { UserProvider } from "./context/UserContext";
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <UserProvider>
      <TransactionProvider> {/* ✅ Wrap with TransactionProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;
