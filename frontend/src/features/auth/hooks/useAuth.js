import { useState } from "react";
import { loginUser, registerUser } from "../services/auth.api";
import { saveAuthSession } from "../services/auth.storage";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const runAuthRequest = async (request) => {
    setLoading(true);
    setError("");

    try {
      const responseData = await request();
      setData(responseData);
      return responseData;
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ identifier, password }) => {
    const responseData = await runAuthRequest(() =>
      loginUser({ identifier, password })
    );
    saveAuthSession(responseData);
    return responseData;
  };

  const register = async ({ username, email, password }) => {
    const responseData = await runAuthRequest(() =>
      registerUser({ username, email, password })
    );
    saveAuthSession(responseData, username);
    return responseData;
  };

  return {
    data,
    error,
    loading,
    login,
    register,
  };
};

export default useAuth;
