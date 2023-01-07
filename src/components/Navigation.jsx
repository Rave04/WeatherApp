import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link to="/">Dzisiejsza prognoza</Link>
        </li>
        <li>
          <Link to="/5days">Prognoza 5-dniowa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
