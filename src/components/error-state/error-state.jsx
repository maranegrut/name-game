import Button from "../navigation/button/button";
import styles from "./error-state.module.css";

const ErrorState = ({ error }) => {
  return (
    <div
      className={styles.errorContainer}
      data-testid={"error-state-container"}
    >
      <p>{error}</p>
      <Button>Try again</Button>
    </div>
  );
};

export default ErrorState;
