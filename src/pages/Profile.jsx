import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  // Handle case where user is null
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Navbar />
        <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">
          <p className="text-red-600 text-center">No user data found. Please log in again.</p>
        </div>
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const [photoUrl, setPhotoUrl] = useState(() => {
    return user.photoUrl || localStorage.getItem("photoUrl") || "";
  });

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    const updatedUser = { ...user, ...formData, photoUrl };
    updateUser(updatedUser);

    // Replace user in localStorage "users" list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result);
      localStorage.setItem("photoUrl", reader.result);
      updateUser({ ...user, photoUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, transactions]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Information</h2>
          <div className="flex items-center space-x-6">
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleEditToggle}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate("/update-password")}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Update Profile Photo</h3>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Transactions</h2>
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          {filteredTransactions.length ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Amount</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">${t.amount}</td>
                    <td className="p-2">{t.type}</td>
                    <td className="p-2">{t.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No transactions found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
