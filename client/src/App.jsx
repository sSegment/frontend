import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Recipes from "./pages/recipes";
import RecipeDetails from "./pages/recipeDetails";
import GenerateRecipe from "./pages/generateRecipe";
import Profile from "./pages/profile";
import SetupPreferences from "./pages/preferneces.jsx";

import Protected from "./components/Protected";
import { useAuth } from "./components/AuthContext.jsx";
import Header from "./components/Header.jsx";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Header />

      
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        


        {/* PROTECTED */}
        <Route 
          path="/" 
          element={
            <Protected>
              <Home />
            </Protected>
          } 
        />
        
        <Route
          path="/recipes"
          element={
            <Protected>
              <Recipes />
            </Protected>
          }
        />

        <Route 
          path="/pages/preferences" 
          element={
            <Protected>
              <SetupPreferences />
            </Protected>
          } 
        />

        <Route
          path="/recipes/:id" 
          element={
            <Protected>
              <RecipeDetails />
            </Protected>
          }
        />

        <Route
          path="/generate"
          element={
            <Protected>
                <GenerateRecipe />
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
