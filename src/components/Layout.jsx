import { useRef, useContext } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { WeatherContext } from "../context/WeatherContext";
import { capitalizeText } from "../helpers";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const { setCity } = useContext(WeatherContext);
  const cityInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = cityInputRef.current.value;
    if (cityName.trim() === "") alert("Nazwa miasta nie może być pusta!");
    else {
      const enteredCity = capitalizeText(cityName);
      setCity(enteredCity);
      localStorage.setItem("city", enteredCity);
      cityInputRef.current.value = "";
    }
  };
  return (
    <div className="layout">
      <Header />
      <main className="App">
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="wpisz miasto" ref={cityInputRef} />
          <button type="submit">Szukaj</button>
        </form>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
