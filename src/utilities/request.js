import { defaultImages } from "./default-images";

export const fetchSanitizedEmployeeData = async () => {
  console.log("fetching stuff");
  const response = await fetch(
    "https://namegame.willowtreeapps.com/api/v1.0/profiles"
  );
  if (!response.ok) {
    throw new Error("No employees!");
  }
  const employeeData = await response.json();

  // Filter out employees with no image or with default WT image
  const sanitizedEmployeeData = employeeData.filter((employee) => {
    return (
      employee.headshot.url !== undefined &&
      !defaultImages.includes(employee.headshot.url)
    );
  });

  return sanitizedEmployeeData;
};
