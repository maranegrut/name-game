/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import LoadingSpinner from "./loading-spinner";

expect.extend(toHaveNoViolations);

describe("Loading Spinner Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = await screen.findByTestId("loading-spinner-container");
    expect(spinner).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
