import styles from "../button.module.css";

const Button = ({ onClick, children, disabled }) => {
  const handleButtonClick = (event) => {
    onClick(event);
  };

  return (
    <button
      className={styles.button}
      onClick={(event) => {
        handleButtonClick(event);
      }}
      disabled={disabled}
      data-testid={"navigation-button"}
    >
      {children}
    </button>
  );
};
export default Button;
