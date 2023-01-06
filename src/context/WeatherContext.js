import React, { createContext, useState, useEffect } from "react";
import { API_KEY, WEATHER_API } from "../config";
import axios from "axios";
import { formatTime } from "../helpers";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [actualWeatherData, setActualWeatherData] = useState({});
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchActualWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${WEATHER_API}/?lang=pl&q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = response.data;
        const newWeatherData = {
          temperature: data.main.temp,
          pressure: data.main.pressure,
          sunrise: formatTime(new Date(data.sys.sunrise * 1000)),
          sunset: formatTime(new Date(data.sys.sunset * 1000)),
          description: [data.weather[0].main, data.weather[0].description],
          wind: data.wind.speed,
        };
        setActualWeatherData(newWeatherData);
        setFetchError("");
      } catch (error) {
        if (error.response.status === 404) {
          setFetchError(`Brak informacji dla miejscowości: ${city}`);
        } else {
          setFetchError(error.message);
        }
        localStorage.removeItem("city");
      }
      setLoading(false);
    };

    if (city) {
      fetchActualWeatherData();
    }
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        actualWeatherData,
        city,
        setCity,
        loading,
        fetchError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
