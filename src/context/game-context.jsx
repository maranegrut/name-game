import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import {
  GameStateReducer,
  defaultGameSession,
} from "../reducers/game-state-reducer";

export const GameContext = React.createContext({
  defaultGameSession,
  dispatchAction: () => {},
  getCurrentQuestion: () => {},
});

const GameContextProvider = (props) => {
  const [gameSession, setGameSession] = useState(defaultGameSession);
  const [gameState, dispatchAction] = useReducer(GameStateReducer, gameSession);

  useEffect(() => {
    const existingGameState =
      JSON.parse(localStorage.getItem("game-state")) || defaultGameSession;
    setGameSession(existingGameState);
  }, []);

  useEffect(() => {
    localStorage.setItem("game-state", JSON.stringify(gameState));
  }, [gameState]);

  const getCurrentQuestion = () => {
    const currentQuestion = gameState.viewedQuestions.find(
      (question) => question.questionNumber === gameState.currentQuestionNumber
    );

    return currentQuestion ?? {};
  };

  console.log("game state at end", gameState);
  const gameContext = {
    employeeData: gameState.employeeData,
    correctAnswers: gameState.correctAnswers,
    viewedQuestions: gameState.viewedQuestions,
    dispatchAction,
    getCurrentQuestion,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
