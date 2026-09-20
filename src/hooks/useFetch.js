import { useCallback, useEffect, useState } from "react";

const useFetch = (fetcher, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, setData, loading, error, refetch };
};

export default useFetch;
