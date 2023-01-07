import Card from "../components/UI/Card";
import styles from "./WeatherElement.module.css";
import { convertDate } from "../helpers";
import { getWeatherPicture } from "../helpers";

const WeatherElement = ({ weather, actual }) => {
  return (
    <Card className={`${styles.weatherElement} ${actual && styles.actual}`}>
      <div className={styles.weatherImage}>
        <img
          src={getWeatherPicture(weather.description[0])}
          alt={weather.description[1]}
        />
      </div>
      <div className={styles.location}>
        <p>{weather.date ? convertDate(weather.date) : weather.city}</p>
      </div>
      <div className={styles.description}>
        <p>{weather.description[1]}</p>
      </div>
      <div className={styles.weatherInfo}>
        <div className={styles.metric}>
          <p>🌡️ {weather.temperature}°C</p>
          <p>💨 {weather.wind}m/s</p>
        </div>

        {weather.sunset && (
          <div className="sun-info">
            <p>☀️ Wschód słońca: {weather.sunrise}</p>
            <p>🌙 Zachód słońca: {weather.sunset}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeatherElement;
