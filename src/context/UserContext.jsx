import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    photoUrl: "https://via.placeholder.com/150",
  });

  const [transactions, setTransactions] = useState([]);

  // Function to update user info
  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  // Function to add new transaction
  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, transactions, addTransaction }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
