// import React from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome * 0.1;
  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">HustleStack Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Balance" value={`$${balance.toFixed(2)}`} color="bg-blue-500" />
          <SummaryCard title="Income" value={`$${totalIncome.toFixed(2)}`} color="bg-green-500" />
          <SummaryCard title="Savings (10%)" value={`$${savings.toFixed(2)}`} color="bg-purple-500" />
          <SummaryCard title="Expenses" value={`$${totalExpenses.toFixed(2)}`} color="bg-red-500" />
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Transaction</h2>
          <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            >
              Add
            </button>
          </form>
        </div>
        {/* Analytics Page button */}
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => navigate("/analytics")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
        >View Analytics</button>
      </div>

        {/* Transactions Preview Table (Optional) */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Transactions</h2>
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">${t.amount.toFixed(2)}</td>
                  <td className="p-2 capitalize">{t.type}</td>
                  <td className="p-2">{t.category}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No transactions yet.
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

const SummaryCard = ({ title, value, color }) => (
  <div className={`rounded-lg p-4 text-white shadow-md ${color}`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2">{value}</p>
  </div>
);

export default Dashboard;
