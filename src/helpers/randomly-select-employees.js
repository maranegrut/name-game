export const selectEmployeesForNewQuestion = (employeeData) => {
  const randomEmployees = [];
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

  return { randomEmployees, featuredEmployee };
};
