import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import {
  GameStateReducer,
  GameContextActionTypes,
  defaultGameSession,
} from "../reducers/game-state-reducer";

export const GameContext = React.createContext({
  defaultGameSession,
  addNewQuestion: (question) => {},
  updateQuestion: (answer) => {},
  navigateBack: () => {},
  nextViewedQuestion: () => {},
  clearContext: () => {},
  restore: () => {},
});

const GameContextProvider = (props) => {
  const [gameSession, setGameSession] = useState(defaultGameSession);

  useEffect(() => {
    const existingGameState =
      JSON.parse(localStorage.getItem("game-state")) || defaultGameSession;
    setGameSession(existingGameState);
  }, []);

  const [gameState, dispatchAction] = useReducer(GameStateReducer, gameSession);

  useEffect(() => {
    localStorage.setItem("game-state", JSON.stringify(gameState));
  }, [gameState]);

  const addNewQuestionHandler = (question) => {
    dispatchAction({
      type: GameContextActionTypes.NewQuestion,
      question: question,
    });
  };
  const updateQuestionHandler = (answer) => {
    dispatchAction({
      type: GameContextActionTypes.UpdateQuestion,
      answer: answer,
    });
  };

  const navigateBackHandler = () => {
    dispatchAction({ type: GameContextActionTypes.NavigateBack });
  };
  const nextViewedQuestionHandler = () => {
    dispatchAction({ type: GameContextActionTypes.NextViewedQuestion });
  };

  const clearContextHandler = () => {
    dispatchAction({ type: GameContextActionTypes.ClearContext });
  };
  const restoreHandler = (existingSession) => {
    dispatchAction({
      type: GameContextActionTypes.Restore,
      existingSession: existingSession,
    });
  };

  // console.log("game state at bottom", gameState);
  const gameContext = {
    correctAnswers: gameState.correctAnswers,
    viewedQuestions: gameState.viewedQuestions,
    currentQuestion: gameState.currentQuestion,
    addNewQuestion: addNewQuestionHandler,
    updateQuestion: updateQuestionHandler,
    navigateBack: navigateBackHandler,
    nextViewedQuestion: nextViewedQuestionHandler,
    clearContext: clearContextHandler,
    restore: restoreHandler,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
