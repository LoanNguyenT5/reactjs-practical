import React, { createContext, useState, ReactElement, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthenticatedContext = createContext<AuthContextType | null>(null);

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticatedContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};

export { AuthenticatedProvider, AuthenticatedContext };
