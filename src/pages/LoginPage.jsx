import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy fallback users
const USERS = [
  { email: "user@example.com", password: "123456", name: "Test User" },
  { email: "admin@example.com", password: "admin123", name: "Admin User" }
];

// Function to get both dummy and registered users
const getAllUsers = () => {
  const stored = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  return [...USERS, ...stored];
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const allUsers = getAllUsers();

    const foundUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          New here?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
