import styles from "./congrats-section.module.css";

const CongratsSection = ({ score }) => {
  return (
    <section className={styles.section}>
      <h1 className={styles.congratsHeading}>
        Congratulations, <br />
        {`you scored ${score}!`}
      </h1>
    </section>
  );
};

export default CongratsSection;
