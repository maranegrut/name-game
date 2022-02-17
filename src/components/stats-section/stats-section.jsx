import styles from "./stats-section.module.css";
import { useContext } from "react";
import { GameContext } from "../../context/game-context";
import { calculateStats } from "../../helpers/stats-helpers";

const StatsSection = () => {
  const gameCtx = useContext(GameContext);

  const { correctAnswers, viewedQuestions } = gameCtx;

  const { percentCorrect, percentIncorrect, averageTime } = calculateStats(
    correctAnswers,
    viewedQuestions
  );

  return (
    <section className={styles.statsSection} data-testid={"stats-section"}>
      <div className={styles.statsContainer}>
        <div data-testid={"correct-selections"}>
          <h2>{`${percentCorrect}%`}</h2>
          <p>Correct Selections</p>
        </div>
        <div data-testid={"incorrect-selections"}>
          <h2>{`${percentIncorrect}%`}</h2>
          <p>Incorrect Selections</p>
        </div>
        <div daat-testid={"avg-selection-time"}>
          <h2>{`${averageTime} sec`}</h2>
          <p>Avg Selection Time</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
