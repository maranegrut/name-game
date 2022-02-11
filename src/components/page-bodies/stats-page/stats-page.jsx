import Button from "../../button";
import Header from "../../header";
import { useRouter } from "next/router";
import CongratsSection from "../../congrats-section";
import styles from "./stats-page.module.css";
import StatsSection from "../../stats-section";
import { useContext, useEffect } from "react";
import { GameContext } from "../../../context/game-context";

const StatsPage = () => {
  const gameCtx = useContext(GameContext);
  const router = useRouter();
  console.log(gameCtx);

  const { correctAnswers, viewedQuestions } = gameCtx;
  const score = `${correctAnswers}/${viewedQuestions.length}`;

  useEffect(() => {
    const existingGameState = JSON.parse(localStorage.getItem("game-state"));
    gameCtx.restore(existingGameState);
  }, []);

  const returnHomeHandler = () => {
    router.push("/");
  };

  return (
    <>
      <Header />
      <div>
        <CongratsSection score={score} />
        <div className={styles.buttonContainer}>
          <Button onClick={returnHomeHandler}>Return to Home</Button>
        </div>
        <StatsSection />
      </div>
    </>
  );
};

export default StatsPage;
