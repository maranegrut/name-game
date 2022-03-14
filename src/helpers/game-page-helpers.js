export const selectEmployeesForNewQuestion = (employeeData) => {
  const randomEmployees = [];
  // Get six random employees
  if (employeeData) {
    let i = 0;
    while (i < 6) {
      const randomEmployee =
        employeeData[Math.floor(Math.random() * employeeData.length)];
      if (!randomEmployees.includes(randomEmployee)) {
        randomEmployees.push(randomEmployee);
        i++;
      }
    }
  }
  return randomEmployees;
};

export const chooseFeaturedEmployee = (randomEmployees) => {
  const featuredEmployee =
    randomEmployees[Math.floor(Math.random() * randomEmployees.length)];
  return featuredEmployee;
};

export const determineOverlayStyle = (
  employeeId,
  chosenAnswerId,
  featuredEmployeeId,
  hasAnswered
) => {
  let overlay;
  const answeredCorrectly = chosenAnswerId === featuredEmployeeId;
  if (employeeId === chosenAnswerId && answeredCorrectly) {
    overlay = "correct";
  }
  if (employeeId === chosenAnswerId && !answeredCorrectly) {
    overlay = "incorrect";
  }
  if (hasAnswered && employeeId !== chosenAnswerId) {
    overlay = "neutral";
  }
  return overlay;
};
