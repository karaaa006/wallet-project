import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (query, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(query + `?page=${page}`);
      console.log(res);
      setList((prev) => [...prev, ...res.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
    console.log("in fetch", list);
  }, [query, sendQuery, page]);

  return { loading, error, list };
};

export default useFetch;
