import { api } from "./client";

// register
export const register = (data) => {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// login (cookie-based)
export const login = (data) => {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// logout
export const logout = () => {
  return api("/auth/logout", {
    method: "POST"
  });
};

