import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // <-- NEW

  // Load user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // <-- loading finished
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));  // <-- persist
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");  // <-- clear
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}> 
      {children}
    </AuthContext.Provider>
  );
};
