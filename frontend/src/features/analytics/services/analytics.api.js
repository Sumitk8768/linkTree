import apiClient from "../../../shared/services/apiClient";

export const getAnalytics = async ({ username }) => {
  const response = await apiClient.get(`/links/${username}/analytics`);
  return response.data;
};
