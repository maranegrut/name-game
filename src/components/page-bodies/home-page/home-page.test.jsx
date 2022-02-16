/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import GameContextProvider from "../../../context/game-context";
import HomePage from "./home-page";

expect.extend(toHaveNoViolations);

describe("Home Page Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <GameContextProvider>
        <HomePage />
      </GameContextProvider>
    );
    const link = await screen.findByTestId("homepage");
    expect(link).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
