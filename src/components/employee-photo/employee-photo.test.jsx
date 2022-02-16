/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import EmployeePhoto from "./employee-photo";

expect.extend(toHaveNoViolations);

describe("Employee Photo Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(<EmployeePhoto photoUrl="my-employee-url" />);
    const photo = await screen.findByTestId("photo-and-overlay-container");
    expect(photo).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("expects component with overlay to have no accessibility violations", async () => {
    const { container } = render(
      <EmployeePhoto photoUrl="my-employee-url" overlay="incorrect" />
    );
    const photo = await screen.findByTestId("photo-and-overlay-container");
    expect(photo).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("expects photo to render with correct overlay", async () => {
    render(<EmployeePhoto photoUrl="my-employee-url" overlay="correct" />);
    const photo = await screen.findByTestId("overlay");
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveClass("answerOverlay overlayCorrect");
  });

  it("expects photo to render with incorrect overlay", async () => {
    render(<EmployeePhoto photoUrl="my-employee-url" overlay="incorrect" />);
    const photo = await screen.findByTestId("overlay");
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveClass("answerOverlay overlayIncorrect");
  });

  it("expects photo to render with neutral overlay", async () => {
    render(<EmployeePhoto photoUrl="my-employee-url" overlay="neutral" />);
    const photo = await screen.findByTestId("overlay");
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveClass("overlayNeutral");
  });
});
