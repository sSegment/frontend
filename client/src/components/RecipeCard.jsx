import { useState } from "react";
import { updateRecipe, deleteRecipe, publishRecipe } from "../api/recipes";

export default function RecipeCard({ recipe, onUpdate, onDelete, onPublish }) {

    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(recipe.title);

    const handleUpdate = async () => {
        const updated = await updateRecipe(recipe.id, { title });
        onUpdate(updated);
        setEditing(false);
    };

    const handleDelete = async () => {
        await deleteRecipe(recipe.id);
        onDelete(recipe.id);
    };

    const handlePublish = async () => {
        const updated = await publishRecipe(recipe.id);
        onPublish(updated);
    };


    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>

            {editing ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <h3>{recipe.title}</h3>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            )}

            <h4>Ingredients</h4>
            <ul>
                {recipe.ingredients?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <h4>Instructions</h4>
            <ol>
                {recipe.instructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ol>

            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p>
                <strong>Time:</strong>{" "}
                {recipe.prepTimeInMinutes + recipe.cookingTimeInMinutes} mins
            </p>

            {recipe.nutritionInfo && (
                <>
                    <h4>Nutrition</h4>
                    <p>Calories: {recipe.nutritionInfo.caloriesKcal} kcal</p>
                    <p>Protein: {recipe.nutritionInfo.proteinG}g</p>
                    <p>Carbs: {recipe.nutritionInfo.carbsG}g</p>
                    <p>Fat: {recipe.nutritionInfo.fatG}g</p>
                </>
            )}

            <div>
                <button onClick={handleDelete}>Delete</button>
                {recipe.status === "PUBLISHED" ? (
                    <p style={{ color: "green" }}>Published</p>
                ) : (
                    <button onClick={handlePublish}>Publish</button>
                )}


            </div>
        </div>
    );

}
