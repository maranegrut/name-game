import Header from "../../header";
import EmployeePhoto from "../../employee-photo";
import styles from "./game-page.module.css";
import Button from "../../button";
import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { GameContext } from "../../../context/game-context";
import LoadingSpinner from "../../loading-spinner";
import ErrorState from "../../error-state";
import { defaultImages } from "../../../utilities/default-images";

const GamePage = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectionTime, setSelectionTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const timer = useRef(null);
  const router = useRouter();

  const gameCtx = useContext(GameContext);
  const { currentQuestion, viewedQuestions } = gameCtx;

  const hasAnswered = currentQuestion.chosenAnswer ?? false;
  const chosenAnswer = currentQuestion.chosenAnswer;
  const featuredEmployee = currentQuestion.correctAnswer;
  let answeredCorrectly;
  if (chosenAnswer && featuredEmployee) {
    answeredCorrectly = chosenAnswer.id === featuredEmployee.id;
  }

  const disabled = !gameCtx.currentQuestion.chosenAnswer;

  let randomEmployees = currentQuestion.answerChoices;

  const selectEmployeesForNewQuestion = (employeeData) => {
    randomEmployees = [];
    // Get six random employees
    let i = 0;
    while (i < 6) {
      const randomEmployee =
        employeeData[Math.floor(Math.random() * employeeData.length)];
      if (!randomEmployees.includes(randomEmployee)) {
        randomEmployees.push(randomEmployee);
        i++;
      }
    }
    // Select employee who will be the correct answer
    featuredEmployee =
      randomEmployees[Math.floor(Math.random() * randomEmployees.length)];
  };

  const clearAndRestartTimer = () => {
    setSelectionTime(0);
    timer.current = setInterval(
      () => setSelectionTime((currentTime) => currentTime + 1),
      1000
    );
  };

  const createNewQuestion = (employeeData) => {
    selectEmployeesForNewQuestion(employeeData);

    gameCtx.addNewQuestion({
      questionNumber: viewedQuestions.length + 1,
      answerChoices: randomEmployees,
      correctAnswer: featuredEmployee,
    });

    clearAndRestartTimer();
  };

  useEffect(async () => {
    const existingGameState = JSON.parse(localStorage.getItem("game-state"));

    gameCtx.restore(existingGameState);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://namegame.willowtreeapps.com/api/v1.0/profiles"
      );
      if (!response.ok) {
        throw new Error("Uh, oh! Could not fetch employees");
      }
      const employeeData = await response.json();
      // Filter out employees with no image or with default WT image
      const sanitizedEmployeeData = employeeData.filter((employee) => {
        return (
          employee.headshot.url !== undefined &&
          !defaultImages.includes(employee.headshot.url)
        );
      });
      setAllEmployees(sanitizedEmployeeData);
      // Only create a new question if a new session is being started
      // When a page is refreshed and this runs, existing question is shown
      // Instead of a fresh question
      if (existingGameState.viewedQuestions.length === 0) {
        createNewQuestion(sanitizedEmployeeData);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); //TODO: look into dependencies here

  const answerHandler = (event) => {
    if (hasAnswered) return;

    clearInterval(timer.current);
    timer.current = null; //TODO: look into these two timer lines

    hasAnswered = true;
    const chosenAnswer = randomEmployees.find(
      (employee) => employee.headshot.url === event.target.src
    );
    gameCtx.updateQuestion({ chosenAnswer, selectionTime });
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
        createNewQuestion(allEmployees);
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
              if (employee.id === chosenAnswer.id && answeredCorrectly) {
                overlay = "correct";
              }
              if (employee.id === chosenAnswer.id && !answeredCorrectly) {
                overlay = "incorrect";
              }
              if (hasAnswered && employee.id !== chosenAnswer.id) {
                overlay = "neutral";
              }
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
          <Button onClick={continueHandler} disabled={disabled}>
            Continue
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        url={"/play"} //TODO: look into removing this
        onBackClick={backClickHandler}
        isOnFirstQuestion={currentQuestion.questionNumber === 1}
      />
      <div className={styles.pageContainer}>{pageContent}</div>
    </>
  );
};

export default GamePage;
