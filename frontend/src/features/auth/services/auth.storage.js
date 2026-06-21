const AUTH_STORAGE_KEY = "linkstack.auth";

const getUserFromResponse = (responseData) => {
  return (
    responseData?.user ||
    responseData?.data?.user ||
    responseData?.data ||
    responseData
  );
};

export const saveAuthSession = (responseData, fallbackUsername = "") => {
  const user = getUserFromResponse(responseData);
  const username = user?.username || responseData?.username || fallbackUsername;

  if (!username) {
    return;
  }

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      username,
      token:
        responseData?.token ||
        responseData?.accessToken ||
        responseData?.data?.token ||
        responseData?.data?.accessToken ||
        "",
    })
  );
};

export const getAuthSession = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getAuthSession()?.username);

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
