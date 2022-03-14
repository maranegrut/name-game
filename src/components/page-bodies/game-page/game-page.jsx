import Header from "../../header/header";
import EmployeePhoto from "../../employee-photo/employee-photo";
import styles from "./game-page.module.css";
import Button from "../../navigation/button/button";
import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { GameContext } from "../../../context/game-context";
import LoadingSpinner from "../../loading-spinner/loading-spinner";
import ErrorState from "../../error-state/error-state";
import {
  selectEmployeesForNewQuestion,
  chooseFeaturedEmployee,
  determineOverlayStyle,
} from "../../../helpers/game-page-helpers";
import { GameContextActionTypes } from "../../../reducers/game-state-reducer";
import { fetchSanitizedEmployeeData } from "../../../utilities/request";

const GamePage = () => {
  const [selectionTime, setSelectionTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const timer = useRef(null);
  const router = useRouter();

  const gameCtx = useContext(GameContext);
  const { currentQuestion, viewedQuestions } = gameCtx;

  const disabled = !gameCtx.currentQuestion.chosenAnswer;
  const hasAnswered = currentQuestion.chosenAnswer ?? false;
  const chosenAnswer = currentQuestion.chosenAnswer;
  const featuredEmployee = currentQuestion.correctAnswer;
  let randomEmployees = currentQuestion.answerChoices;

  const clearAndRestartTimer = () => {
    setSelectionTime(0);
    timer.current = setInterval(
      () => setSelectionTime((currentTime) => currentTime + 1),
      1000
    );
  };

  const createNewQuestion = (employeeData) => {
    randomEmployees = selectEmployeesForNewQuestion(employeeData);
    featuredEmployee = chooseFeaturedEmployee(randomEmployees);

    gameCtx.dispatchAction({
      type: GameContextActionTypes.NewQuestion,
      question: {
        questionNumber: viewedQuestions.length + 1,
        answerChoices: randomEmployees,
        correctAnswer: featuredEmployee,
      },
      //add employee data here
      //or add employees to context - preferred
    });

    clearAndRestartTimer();
  };

  useEffect(() => {
    const existingGameState = JSON.parse(localStorage.getItem("game-state"));
    if (existingGameState) {
      gameCtx.restore(existingGameState);
    }
    setIsLoading(true);
    const getEmployeeData = async () => {
      try {
        const sanitizedEmployeeData = await fetchSanitizedEmployeeData();
        console.log(sanitizedEmployeeData);

        gameCtx.dispatchAction({
          type: GameContextActionTypes.StoreData,
          employeeData: sanitizedEmployeeData,
        });

        // Only create a new question if a new session is being started
        // When a page is refreshed and this runs, existing question is shown
        // Instead of a fresh question
        if (existingGameState.viewedQuestions.length === 0) {
          createNewQuestion(sanitizedEmployeeData);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    getEmployeeData();
  }, []);

  const answerHandler = (event) => {
    if (hasAnswered) return;

    clearInterval(timer.current);
    timer.current = null;

    hasAnswered = true;
    const chosenAnswer = randomEmployees.find(
      (employee) => employee.headshot.url === event.target.src
    );
    gameCtx.dispatchAction({
      type: GameContextActionTypes.UpdateQuestion,
      answer: { chosenAnswer, selectionTime },
    });
  };

  const backClickHandler = () => {
    if (gameCtx.currentQuestion.questionNumber === 1) {
      //TODO: add question if they want to exit game
      router.push("/");
    }
    gameCtx.navigateBack();
  };

  const continueHandler = () => {
    // If user is not on the most recent question,
    // navigate forward to next viewed question
    const hasViewedNextQuestion =
      gameCtx.currentQuestion.questionNumber < gameCtx.viewedQuestions.length;
    if (hasViewedNextQuestion) {
      gameCtx.nextViewedQuestion();
    } else {
      // Move to stats page if user has answered correctly 5 times
      if (gameCtx.correctAnswers >= 1) {
        router.push("/stats");
        // Otherwise create new unanswered question
      } else {
        hasAnswered = false;
        createNewQuestion(gameCtx.employeeData);
      }
    }
  };

  let pageContent;

  if (isLoading) {
    pageContent = <LoadingSpinner />;
  }

  if (error) {
    pageContent = <ErrorState error={error} />;
  }

  if (randomEmployees.length === 6) {
    pageContent = (
      <>
        <div className={styles.question}>
          <p>Which one of these good looking photos is the real</p>
          <h1>{`${featuredEmployee.firstName} ${featuredEmployee.lastName}`}</h1>
        </div>
        <div className={styles.photosContainer}>
          {randomEmployees.map((employee) => {
            // Determine if employee photo was chosen
            // correctly, incorrectly, or not at all
            let overlay;
            if (employee && chosenAnswer) {
              overlay = determineOverlayStyle(
                employee.id,
                chosenAnswer.id,
                featuredEmployee.id,
                hasAnswered
              );
            }
            return (
              <EmployeePhoto
                key={employee.id}
                photoUrl={employee.headshot.url}
                onClick={answerHandler}
                overlay={overlay}
              />
            );
          })}
        </div>
        <div className={styles.bottomNavigation}>
          <div className={styles.buttonContainer}>
            <Button onClick={continueHandler} disabled={disabled}>
              Continue
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div data-testid={"gamepage"}>
      <Header
        url={"/play"} //TODO: look into removing this
        onBackClick={backClickHandler}
        shouldAllowBackClick={currentQuestion.questionNumber !== 1}
      />
      <div className={styles.pageContainer}>{pageContent}</div>
    </div>
  );
};

export default GamePage;
