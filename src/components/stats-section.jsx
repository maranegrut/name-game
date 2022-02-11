import styles from "./stats-section.module.css";
import { useContext } from "react";
import { GameContext } from "../context/game-context";

const StatsSection = () => {
  const gameCtx = useContext(GameContext);

  const { correctAnswers, viewedQuestions } = gameCtx;
  const percentCorrect = Math.round(
    (correctAnswers / viewedQuestions.length) * 100
  );
  const percentIncorrect = 100 - percentCorrect;

  const selectionTimes = gameCtx.viewedQuestions.map(
    (question) => question.selectionTime
  );
  const totalTime = selectionTimes.reduce((a, b) => a + b, 0);
  const averageTime = (totalTime / selectionTimes.length).toFixed(1);

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div>
          <h2>{`${percentCorrect}%`}</h2>
          <p>Correct Selections</p>
        </div>
        <div>
          <h2>{`${percentIncorrect}%`}</h2>
          <p>Incorrect Selections</p>
        </div>
        <div>
          <h2>{`${averageTime} sec`}</h2>
          <p>Avg Selection Time</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
