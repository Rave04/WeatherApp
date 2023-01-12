import WeatherElement from "./WeatherElement";
import styles from "./FutureWeatherContainer.module.css";

const FutureWeatherContainer = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((dataElement) => (
        <WeatherElement weather={dataElement} key={dataElement.id} />
      ))}
    </div>
  );
};

export default FutureWeatherContainer;
