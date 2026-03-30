import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../api/recipes";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipe(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients?.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
