import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  // Fetch user and user-specific transactions on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);

      const userTransactions = localStorage.getItem(`transactions_${userObj.email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      }
    }
  }, [navigate]);

  // Save transactions when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savings = totalIncome * 0.1;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Balance" value={`Ksh${balance.toFixed(2)}`} color="bg-blue-500" />
          <SummaryCard title="Income" value={`Ksh${totalIncome.toFixed(2)}`} color="bg-green-500" />
          <SummaryCard title="Savings (10%)" value={`Ksh${savings.toFixed(2)}`} color="bg-purple-500" />
          <SummaryCard title="Expenses" value={`Ksh${totalExpenses.toFixed(2)}`} color="bg-red-500" />
        </div>

        <form
          onSubmit={handleAddTransaction}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded shadow-md"
        >
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

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
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="p-2">Ksh{t.amount.toFixed(2)}</td>
                    <td className="p-2 capitalize">{t.type}</td>
                    <td className="p-2">{t.category}</td>
                  </tr>
                ))
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
