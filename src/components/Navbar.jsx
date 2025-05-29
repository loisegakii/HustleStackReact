import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/dashboard")}>
        HustleStack
      </div>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/analytics")}
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Analytics
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Profile
        </button>
        {/* Future: Add logout */}
        {/* <button onClick={logoutFunction} className="text-red-500 hover:text-red-700">Logout</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
