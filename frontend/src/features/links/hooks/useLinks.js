import { useCallback, useState } from "react";
import { createLink, deleteLink, getLink, getMyLinks, updateLink } from "../services/links.api";

const useLinks = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const responseData = await getMyLinks();
      return Array.isArray(responseData?.links) ? responseData.links : [];
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to load links.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const addLink = async (payload) => {
    setLoading(true);
    setError("");

    try {
      return await createLink(payload);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to save link.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const fetchLink = useCallback(async ({ linkId }) => {
    setLoading(true);
    setError("");

    try {
      const responseData = await getLink({ linkId });
      return responseData?.link;
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to load link.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const editLink = async ({ linkId, ...payload }) => {
    setLoading(true);
    setError("");

    try {
      return await updateLink({ linkId, ...payload });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to update link.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const removeLink = async ({ linkId }) => {
    setLoading(true);
    setError("");

    try {
      return await deleteLink({ linkId });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to delete link.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const toggleLinkStatus = async ({ isActive, linkId }) => {
    setLoading(true);
    setError("");

    try {
      return await updateLink({ isActive, linkId });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to update link.");
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  return { addLink, editLink, error, fetchLink, fetchLinks, loading, removeLink, toggleLinkStatus };
};

export default useLinks;
