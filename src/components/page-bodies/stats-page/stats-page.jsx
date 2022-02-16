import Button from "../../navigation/button/button";
import Header from "../../header/header";
import { useRouter } from "next/router";
import CongratsSection from "../../congrats-section/congrats-section";
import styles from "./stats-page.module.css";
import StatsSection from "../../stats-section/stats-section";
import { useContext, useEffect } from "react";
import { GameContext } from "../../../context/game-context";

const StatsPage = () => {
  const gameCtx = useContext(GameContext);
  const router = useRouter();

  const { correctAnswers, viewedQuestions } = gameCtx;
  const score = `${correctAnswers}/${viewedQuestions.length}`;

  useEffect(() => {
    const existingGameState = JSON.parse(localStorage.getItem("game-state"));
    if (existingGameState) {
      gameCtx.restore(existingGameState);
    }
  }, []);

  const returnHomeHandler = () => {
    router.push("/");
  };

  return (
    <div data-testid={"statspage"}>
      <Header shouldAllowBackClick={false} />
      <div>
        <CongratsSection score={score} />
        <div className={styles.buttonContainer}>
          <Button onClick={returnHomeHandler}>Return to Home</Button>
        </div>
        <StatsSection />
      </div>
    </div>
  );
};

export default StatsPage;
