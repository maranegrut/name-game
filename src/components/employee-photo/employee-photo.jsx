import styles from "./employee-photo.module.css";

const EmployeePhoto = ({ photoUrl, onClick, overlay }) => {
  const correctClassNames = `${styles.answerOverlay} ${styles.overlayCorrect}`;
  const incorrectClassNames = `${styles.answerOverlay} ${styles.overlayIncorrect}`;
  const neutralClassNames = styles.overlayNeutral;

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
      <div
        className={
          (overlay === "correct" ? correctClassNames : undefined) ||
          (overlay === "incorrect" ? incorrectClassNames : undefined) ||
          (overlay === "neutral" ? neutralClassNames : undefined)
        }
        data-testid={"overlay"}
      ></div>
    </div>
  );
};

export default EmployeePhoto;
