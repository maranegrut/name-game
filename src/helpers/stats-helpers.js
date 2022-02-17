export const calculateStats = (correctAnswers, viewedQuestions) => {
  const percentCorrect = Math.round(
    (correctAnswers / viewedQuestions.length) * 100
  );
  const percentIncorrect = 100 - percentCorrect;

  const selectionTimes = viewedQuestions.map(
    (question) => question.selectionTime
  );
  const totalTime = selectionTimes.reduce((a, b) => a + b, 0);
  const averageTime = (totalTime / selectionTimes.length).toFixed(1);
  return { percentCorrect, percentIncorrect, averageTime };
};
