import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TransactionContext = createContext();

// Create the provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
  const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  setTransactions(storedTransactions);
}, []);


  // Optional: Persist changes to local storage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Remove a transaction by ID
  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
