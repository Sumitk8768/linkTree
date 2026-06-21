import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
});

export const loginUser = async ({ identifier, password }) => {
  const response = await authApiInstance.post("/login", {
    identifier,
    password,
  });

  return response.data;
};

export const registerUser = async ({ username, email, password }) => {
  const response = await authApiInstance.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
};
