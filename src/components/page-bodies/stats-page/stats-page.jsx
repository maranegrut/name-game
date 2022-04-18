import Header from "../../header/header";
import { useRouter } from "next/router";
import CongratsSection from "../../congrats-section/congrats-section";
import styles from "./stats-page.module.css";
import StatsSection from "../../stats-section/stats-section";
import { useContext, useEffect } from "react";
import { GameContext } from "../../../context/game-context";
import AnchorLink from "../../navigation/anchor-link/anchor-link";
import { GameContextActionTypes } from "../../../reducers/game-state-reducer";

const StatsPage = () => {
  const gameCtx = useContext(GameContext);

  const { correctAnswers, viewedQuestions } = gameCtx;
  const score = `${correctAnswers}/${viewedQuestions.length}`;

  useEffect(() => {
    const existingGameState = JSON.parse(localStorage.getItem("game-state"));
    if (existingGameState) {
      gameCtx.dispatchAction({
        type: GameContextActionTypes.Restore,
        existingGameState: existingGameState,
      });
    }
  }, []);

  return (
    <div data-testid={"statspage"}>
      <Header shouldAllowBackClick={false} />
      <div>
        <CongratsSection score={score} />
        <div className={styles.buttonContainer}>
          <AnchorLink url={"/"}>Return to Home</AnchorLink>
        </div>
        <StatsSection />
      </div>
    </div>
  );
};

export default StatsPage;
