import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Protected({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
