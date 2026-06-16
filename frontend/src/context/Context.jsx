import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export { Context };