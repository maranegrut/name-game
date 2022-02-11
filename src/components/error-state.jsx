import Button from "./button";
import styles from "./error-state.module.css";

const ErrorState = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <p>{error}</p>
      <Button>Try again</Button>
    </div>
  );
};

export default ErrorState;
