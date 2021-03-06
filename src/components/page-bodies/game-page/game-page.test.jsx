/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import GamePage from "./game-page";
import GameContextProvider from "../../../context/game-context";

expect.extend(toHaveNoViolations);

describe("Game Page Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <GameContextProvider>
        <GamePage />
      </GameContextProvider>
    );
    const link = await screen.findByTestId("gamepage");
    expect(link).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
