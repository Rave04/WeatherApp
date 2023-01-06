import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Card from "../components/UI/Card";
import styles from "./ActualWeather.module.css";
import { getWeatherPicture } from "../helpers";
import useAxiosFetch from "../hooks/UseAxiosFetch";
import { formatTime } from "../helpers";
import { ClipLoader } from "react-spinners";
import WeatherElement from "./WeatherElement";

import { WEATHER_API, API_KEY } from "../config";
const ActualWeather = () => {
  const { city, setCity } = useContext(WeatherContext);
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

  console.log(fetchError);

  // console.log(Object.keys(actualWeatherData).length);

  let errorMessage = "";
  if (fetchError) {
    console.log(fetchError);
    if (fetchError.response.status === 404) {
      errorMessage = `Brak informacji dla miejscowości ${city}!`;
    } else {
      errorMessage = fetchError.message;
    }
  }
  return (
    <div>
      {fetchError && <p className={styles.error}>{errorMessage}</p>}
      {isLoading && (
        <ClipLoader className="loader" color="rgba(32,105, 153, 1)" size={50} />
      )}
      {!fetchError && !isLoading && Object.keys(weatherData).length !== 0 && (
        <WeatherElement actual weather={weatherData} />
        // <Card className={styles.weatherContainer}>
        //   <div className={styles.weatherImage}>
        //     <img
        //       src={getWeatherPicture(weatherData.description[0])}
        //       alt="Słoneczny dzień"
        //     />
        //   </div>
        //   <div className={styles.location}>
        //     <p>{city}</p>
        //   </div>
        //   <div className={styles.description}>
        //     <p>{weatherData.description[1]}</p>
        //   </div>
        //   <div className={styles.weatherInfo}>
        //     <div className="metric">
        //       <p>🌡️ {weatherData.temperature}°C</p>
        //       <p>💨 {weatherData.wind}m/s</p>
        //     </div>

        //     <div className="sun-info">
        //       <p>☀️ Wschód słońca: {weatherData.sunrise}</p>
        //       <p>🌙 Zachód słońca: {weatherData.sunset}</p>
        //     </div>
        //   </div>
        // </Card>
      )}
    </div>
  );
};

export default ActualWeather;
