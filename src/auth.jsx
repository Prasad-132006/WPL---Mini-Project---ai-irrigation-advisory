import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/auth/me").then(({ user: currentUser }) => setUser(currentUser)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    register: async (details) => {
      const response = await api("/auth/register", { method: "POST", body: JSON.stringify(details) });
      setUser(response.user);
      return response.user;
    },
    login: async (email, password) => {
      const response = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setUser(response.user);
      return response.user;
    },
    logout: async () => {
      try { await api("/auth/logout", { method: "POST" }); } finally { setUser(null); }
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
