import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { city } = useContext(WeatherContext);

  useEffect(() => {
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err);
        setData([]);
      } finally {
        setTimeout(() => setIsLoading(false), 650);
      }
    };
    if (city) {
      fetchData(dataUrl);
    }
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
