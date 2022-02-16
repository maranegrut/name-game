/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import CongratsSection from "./congrats-section";

expect.extend(toHaveNoViolations);

describe("Congratulations Section Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(<CongratsSection score={"5/5"} />);
    const section = await screen.findByTestId("congrats-section");
    expect(section).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("expects section to render disabled", async () => {
    render(<CongratsSection score={"5/5"} />);
    const section = await screen.findByTestId("congrats-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent("Congratulations, you scored 5/5");
  });
});
