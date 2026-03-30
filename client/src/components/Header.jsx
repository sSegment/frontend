import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/generate">Generate Recipe</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <span>{user?.firstname}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
