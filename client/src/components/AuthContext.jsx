import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/users";
import { logout as apiLogout } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
  try {
    const data = await getProfile();
    console.log("PROFILE RESPONSE:", data);
    setUser(data);
  } catch (err) {
    console.error("GET PROFILE FAILED:", err);
    setUser(null);
  }
};


  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    init();
  }, []);

  const refreshUser = loadUser;

  

    const logout = async () => {
    await apiLogout();
    setUser(null);
    };


  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
