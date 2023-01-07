import { useContext } from "react";
import useAxiosFetch from "../hooks/UseAxiosFetch";
import { WeatherContext } from "../context/WeatherContext";
import { formatTime } from "../helpers";
import { ClipLoader } from "react-spinners";
import WeatherElement from "./WeatherElement";
import { WEATHER_API, API_KEY } from "../config";

const ActualWeather = () => {
  const { city } = useContext(WeatherContext);
  let weatherData = {};

  const { data, fetchError, isLoading } = useAxiosFetch(
    `${WEATHER_API}/?lang=pl&q=${city}&units=metric&appid=${API_KEY}`
  );

  if (Object.entries(data).length > 0) {
    const newWeatherData = {
      city: city,
      temperature: data.main.temp,
      sunrise: formatTime(new Date(data.sys.sunrise * 1000)),
      sunset: formatTime(new Date(data.sys.sunset * 1000)),
      description: [data.weather[0].main, data.weather[0].description],
      wind: data.wind.speed,
    };

    for (let key in newWeatherData) {
      weatherData[key] = newWeatherData[key];
    }
  }

  let errorMessage = "";
  if (fetchError) {
    if (fetchError.response.status === 404) {
      errorMessage = `Brak informacji dla miejscowości ${city}!`;
    } else {
      errorMessage = fetchError.message;
    }
  }
  return (
    <div>
      {fetchError && <p className="errorMessage">{errorMessage}</p>}
      {isLoading && (
        <ClipLoader className="loader" color="rgba(32,105, 153, 1)" size={50} />
      )}
      {!fetchError && !isLoading && Object.keys(weatherData).length !== 0 && (
        <WeatherElement actual weather={weatherData} />
      )}
    </div>
  );
};

export default ActualWeather;
