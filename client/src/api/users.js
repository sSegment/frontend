import { api } from "./client";

// profile
export const getProfile = () => api("/users/me");

// update profile
export const updateProfile = (data) =>
  api("/users/me", {
    method: "PUT",
    body: JSON.stringify(data)
  });

// allergens
export const addAllergen = (allergen) =>
  api("/users/allergens", {
    method: "POST",
    body: JSON.stringify({ allergen })
  });

export const removeAllergen = (allergen) =>
  api("/users/allergens", {
    method: "DELETE",
    body: JSON.stringify({ allergen })
  });

// dietary
export const addDiet = (diet) =>
  api("/users/dietary-preferences", {
    method: "POST",
    body: JSON.stringify({ dietaryPreference: diet })
  });

export const removeDiet = (diet) =>
  api("/users/dietary-preferences", {
    method: "DELETE",
    body: JSON.stringify({ dietaryPreference: diet })
  });


