import {
  selectEmployeesForNewQuestion,
  chooseFeaturedEmployee,
} from "../helpers/game-page-helpers";

export const GameContextActionTypes = {
  NewQuestion: "NEW_QUESTION",
  UpdateQuestion: "UPDATE_QUESTION",
  NextViewedQuestion: "NEXT_VIEWED_QUESTION",
  NavigateBack: "NAVIGATE_BACK",
  ClearContext: "CLEAR_CONTEXT",
  Restore: "RESTORE",
  StoreData: "STORE_DATA",
};

export const defaultGameSession = {
  employeeData: [],
  correctAnswers: 0,
  currentQuestionNumber: 0,
  viewedQuestions: [],
};

export const GameStateReducer = (state, action) => {
  if (action.type === GameContextActionTypes.NewQuestion) {
    const randomEmployees = selectEmployeesForNewQuestion(state.employeeData);
    const featuredEmployee = chooseFeaturedEmployee(randomEmployees);

    const newQuestion = {
      questionNumber: action.questionNumber,
      answerChoices: randomEmployees,
      correctAnswerId: featuredEmployee.id,
    };

    const updatedQuestions = [...state.viewedQuestions, newQuestion];
    return {
      ...state,
      viewedQuestions: updatedQuestions,
      currentQuestionNumber: newQuestion.questionNumber,
    };
  }
  if (action.type === GameContextActionTypes.UpdateQuestion) {
    let totalCorrect;
    let updatedViewedQuestions = [...state.viewedQuestions];

    const currentQuestionIndex = state.currentQuestionNumber - 1;
    const existingCurrentQuestion = state.viewedQuestions[currentQuestionIndex];

    const chosenAnswerId = existingCurrentQuestion.answerChoices.find(
      (employee) => employee.headshot.url === action.clickedPhotoUrl
    ).id;

    const updatedCurrentQuestion = {
      ...existingCurrentQuestion,
      chosenAnswerId: chosenAnswerId,
      selectionTime: action.selectionTime,
    };
    updatedViewedQuestions[currentQuestionIndex] = updatedCurrentQuestion;

    if (chosenAnswerId === updatedCurrentQuestion.correctAnswerId) {
      totalCorrect = state.correctAnswers + 1;
    } else {
      totalCorrect = state.correctAnswers;
    }
    return {
      ...state,
      viewedQuestions: updatedViewedQuestions,
      correctAnswers: totalCorrect,
    };
  }
  if (action.type === GameContextActionTypes.NavigateBack) {
    const updatedQuestionNumber = state.currentQuestionNumber - 1;
    if (updatedQuestionNumber > 0) {
      return { ...state, currentQuestionNumber: updatedQuestionNumber };
    } else {
      return { ...defaultGameSession };
    }
  }
  if (action.type === GameContextActionTypes.NextViewedQuestion) {
    const updatedQuestionNumber = state.currentQuestionNumber + 1;
    return { ...state, currentQuestionNumber: updatedQuestionNumber };
  }
  if (action.type === GameContextActionTypes.ClearContext) {
    return { ...defaultGameSession };
  }
  if (action.type === GameContextActionTypes.Restore) {
    localStorage.setItem(
      "game-state",
      JSON.stringify(action.existingGameState)
    );
    return { ...action.existingGameState };
  }
  if (action.type === GameContextActionTypes.StoreData) {
    return { ...state, employeeData: action.employeeData };
  }

  return { ...defaultGameSession };
};
