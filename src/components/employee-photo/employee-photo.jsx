import styles from "./employee-photo.module.css";
import classNames from "classnames";

const EmployeePhoto = ({ photoUrl, onClick, overlay }) => {
  const overlayClassName = classNames({
    [styles.overlayNeutral]: overlay === "neutral",
    [styles.answerOverlay]: overlay === "correct" || overlay === "incorrect",
    [styles.overlayCorrect]: overlay === "correct",
    [styles.overlayIncorrect]: overlay === "incorrect",
  });

  return (
    <div
      className={styles.photoAndOverlayContainer}
      data-testid={"photo-and-overlay-container"}
    >
      <div className={styles.photoContainer} onClick={onClick}>
        <img
          className={styles.photo}
          src={photoUrl}
          data-testid={"employee-photo"}
          alt={"employee headshot"}
        ></img>
      </div>
      <div className={overlayClassName} data-testid={"overlay"}></div>
    </div>
  );
};

export default EmployeePhoto;
