import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Sample user data
  const [user, setUser] = useState({
    name: "Your Name",
    email: "name@example.com",
    photo: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Sample transactions
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 100, type: "income", category: "Salary" },
    { id: 2, amount: 50, type: "expense", category: "Groceries" },
    { id: 3, amount: 200, type: "income", category: "Freelance" },
    { id: 4, amount: 30, type: "expense", category: "Transport" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // Implement API call to update user info if needed
  };

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Information</h2>
          <div className="flex items-center space-x-6">
            <img
              src={user.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={handleEditToggle}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => navigate("/update-password")}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Transactions</h2>
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">${t.amount.toFixed(2)}</td>
                  <td className="p-2 capitalize">{t.type}</td>
                  <td className="p-2">{t.category}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
