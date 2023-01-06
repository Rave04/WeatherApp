import styles from "./Card.module.css";

const Card = ({ className, children }) => {
  return <div className={`${className} ${styles.card}`}>{children}</div>;
};

export default Card;
