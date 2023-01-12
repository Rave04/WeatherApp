import { useContext } from "react";
import useAxiosFetch from "../hooks/UseAxiosFetch";
import { WeatherContext } from "../context/WeatherContext";
import { ClipLoader } from "react-spinners";
import FutureWeatherContainer from "./FutureWeatherContainer";
import { FORECAST_API, API_KEY } from "../config";
import styles from "./FutureWeather.module.css";

const FutureWeather = () => {
  const { city } = useContext(WeatherContext);
  let weatherData = [];
  const { data, fetchError, isLoading } = useAxiosFetch(
    `${FORECAST_API}/?lang=pl&q=${city}&units=metric&appid=${API_KEY}`
  );

  if (Object.entries(data).length > 0) {
    for (const dailyWeather of data.list) {
      if (dailyWeather["dt_txt"].includes("12:00:00")) {
        const newWeatherData = {
          id: dailyWeather.dt,
          date: dailyWeather["dt_txt"].substring(0, 10),
          temperature: dailyWeather.main.temp,
          description: [
            dailyWeather.weather[0].main,
            dailyWeather.weather[0].description,
          ],
          wind: dailyWeather.wind.speed,
        };
        weatherData.push(newWeatherData);
      }
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
      {!fetchError && !isLoading && weatherData.length !== 0 && (
        <>
          <h3 className={styles.cityName}>{city}</h3>
          <FutureWeatherContainer data={weatherData} />
        </>
      )}
    </div>
  );
};

export default FutureWeather;
