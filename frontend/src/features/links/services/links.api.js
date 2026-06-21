import apiClient from "../../../shared/services/apiClient";

export const createLink = async ({ title, url }) => {
  const response = await apiClient.post("/links", { title, url });
  return response.data;
};

export const getMyLinks = async ({ username }) => {
  const response = await apiClient.get(`/links/${username}`);
  return response.data;
};

export const getLink = async ({ linkId }) => {
  const response = await apiClient.get(`/links/item/${linkId}`);
  return response.data;
};

export const deleteLink = async ({ linkId }) => {
  const response = await apiClient.delete(`/links/${linkId}`);
  return response.data;
};

export const updateLink = async ({ linkId, ...payload }) => {
  const response = await apiClient.patch(`/links/${linkId}`, payload);
  return response.data;
};
