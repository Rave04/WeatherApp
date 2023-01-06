import Navigation from "./Navigation";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>React Weather</h1>
      <Navigation />
    </header>
  );
};

export default Header;
