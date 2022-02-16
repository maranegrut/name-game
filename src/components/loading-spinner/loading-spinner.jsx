import styles from "./loading-spinner.module.css";

const LoadingSpinner = () => {
  return (
    <div
      className={styles.spinnerContainer}
      data-testid={"loading-spinner-container"}
    >
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;
