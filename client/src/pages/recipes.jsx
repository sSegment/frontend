import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipes";
import { Link } from "react-router-dom";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      {recipes.map(r => (
        <div key={r.id}>
          <Link to={`/recipes/${r.id}`}>
            <h3>{r.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
