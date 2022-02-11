import styles from "./employee-photo.module.css";

const EmployeePhoto = ({ photoUrl, onClick, overlay }) => {
  const correctClassNames = `${styles.answerOverlay} ${styles.overlayCorrect}`;
  const incorrectClassNames = `${styles.answerOverlay} ${styles.overlayIncorrect}`;
  const neutralClassNames = styles.overlayNeutral;

  return (
    <div className={styles.photoAndOverlayContainer}>
      <div className={styles.photoContainer} onClick={onClick}>
        <img className={styles.photo} src={photoUrl}></img>
      </div>
      <div
        className={
          (overlay === "correct" ? correctClassNames : undefined) ||
          (overlay === "incorrect" ? incorrectClassNames : undefined) ||
          (overlay === "neutral" ? neutralClassNames : undefined)
        }
      ></div>
    </div>
  );
};

export default EmployeePhoto;
