import { api } from "./client";

export const getRecipes = () => api("/recipes");

export const getRecipe = (id) => api(`/recipes/${id}`);

export const updateRecipe = (id, recipe) => {
  return api(`/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify(recipe)
  });
};

export const deleteRecipe = (id) => {
  return api(`/recipes/${id}`, {
    method: "DELETE"
  });
};

export const generateRecipes = (data) => {
  return api("/recipes", {
    method: "POST",
    body: JSON.stringify(data)
  });
};


export const publishRecipe = (id) =>
  api(`/recipes/${id}/publish`, {
    method: "PUT"
  });
