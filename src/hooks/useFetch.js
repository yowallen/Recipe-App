import {useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoad(true);
      setTimeout(async () => {
        try {
          const response = await axios.get(url, {signal: controller.signal});
          if (!response.status === 200) {
            throw new Error(response.statusText);
          }
          const data = await response.data;

          setLoad(false);
          setError("");
          setData(data);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Fetching Aborted");
          } else {
            setLoad(false);
            setError("Couldn't fetch data");
          }
        }
      }, 2000);
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {data, load, error};
};

export default useFetch;
