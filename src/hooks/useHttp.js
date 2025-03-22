import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData?.message ?? 'Request failed!');
  }

  return resData;
};

const useHttp = (url, config, initData) => {
  const [data, setData] = useState(initData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(
    () => {
      if((!config || config?.method === 'GET') && url) {
        sendRequest(url, config);
      }
    },
    [sendRequest, url, config]
  );
  
  return {
    data,
    isLoading,
    error,
    sendRequest,
  };

};

export default useHttp;