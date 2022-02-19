import React, { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]); //create a reference hook

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const requestAbortController = new AbortController(); // this is built into browsers
      activeHttpRequests.current.push(requestAbortController); // add AbortController to our ref
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        return data;
      } catch (err) {
        setError(err.message || "Someting went wrong!");
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // We will use an empty useEffect to abort the requests
    // when the component unmounts. The empty function becomes an cleanup
    return () => {
      activeHttpRequests.current.forEach((AbortController) =>
        AbortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
