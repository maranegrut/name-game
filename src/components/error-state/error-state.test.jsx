/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import ErrorState from "./error-state";

expect.extend(toHaveNoViolations);

describe("Error State Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <ErrorState error={"Oops, there was an error"} />
    );
    const photo = await screen.findByTestId("error-state-container");
    expect(photo).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
