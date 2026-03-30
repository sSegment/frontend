import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { generateRecipes } from "../api/recipes";

export default function GenerateRecipe() {
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setRecipes([]);

    try {
      const data = await generateRecipes({ prompt });
      console.log("GENERATED DATA:", data);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      <h1>Generate Recipes</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. high protein vegan meals"
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      {!loading && recipes.length === 0 && (
        <p>No recipes yet. Try generating something.</p>
      )}

      <div>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onUpdate={(updated) =>
              setRecipes(prev =>
                prev.map(r => r.id === updated.id ? updated : r)
              )
            }
            onDelete={(id) =>
              setRecipes(prev =>
                prev.filter(r => r.id !== id)
              )
            }
            onPublish={(updated) =>
              setRecipes(prev =>
                prev.map(r => r.id === updated.id ? updated : r)
              )
            }
          />

        ))}
      </div>
    </div>
  );
}
