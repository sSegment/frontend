import { api } from "./client";

export const getAllergens = () =>
  api("/diet/allergens");

export const getDietaryPreferences = () =>
  api("/diet/dietary-preferences");
