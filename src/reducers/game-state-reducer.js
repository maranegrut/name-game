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
  viewedQuestions: [],
  currentQuestion: {
    questionNumber: 0,
    answerChoices: [{}],
    correctAnswer: {},
    chosenAnswer: {},
    selectionTime: 0,
  },
};

export const GameStateReducer = (state, action) => {
  if (action.type === GameContextActionTypes.NewQuestion) {
    const updatedQuestions = [...state.viewedQuestions, action.question];
    return {
      ...state,
      viewedQuestions: updatedQuestions,
      currentQuestion: action.question,
    };
  }
  if (action.type === GameContextActionTypes.UpdateQuestion) {
    let totalCorrect;
    let updatedViewedQuestions = [...state.viewedQuestions];
    const currentQuestionIndex = state.viewedQuestions.findIndex(
      (question) => question === state.currentQuestion
    );
    const updatedCurrentQuestion = {
      ...state.currentQuestion,
      chosenAnswer: action.answer.chosenAnswer,
      selectionTime: action.answer.selectionTime,
    };
    updatedViewedQuestions[currentQuestionIndex] = updatedCurrentQuestion;

    if (
      action.answer.chosenAnswer.headshot.url ===
      state.currentQuestion.correctAnswer.headshot.url
    ) {
      totalCorrect = state.correctAnswers + 1;
    } else {
      totalCorrect = state.correctAnswers;
    }
    return {
      ...state,
      currentQuestion: updatedCurrentQuestion,
      viewedQuestions: updatedViewedQuestions,
      correctAnswers: totalCorrect,
    };
  }
  if (action.type === GameContextActionTypes.NavigateBack) {
    const currentQuestionIndex = state.currentQuestion.questionNumber - 1;
    const previousQuestion = state.viewedQuestions[currentQuestionIndex - 1];
    if (currentQuestionIndex > 0) {
      return { ...state, currentQuestion: previousQuestion };
    } else {
      return { ...defaultGameSession };
    }
  }
  if (action.type === GameContextActionTypes.NextViewedQuestion) {
    const newCurrentQuestion =
      state.viewedQuestions[state.currentQuestion.questionNumber];
    return { ...state, currentQuestion: newCurrentQuestion };
  }
  if (action.type === GameContextActionTypes.ClearContext) {
    return { ...defaultGameSession };
  }
  if (action.type === GameContextActionTypes.Restore) {
    localStorage.setItem("game-state", JSON.stringify(action.existingSession));
    return { ...action.existingSession };
  }
  if (action.type === GameContextActionTypes.StoreData) {
    return { ...state, employeeData: action.employeeData };
  }

  return { ...defaultGameSession };
};
