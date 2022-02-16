/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import StatsPage from "./stats-page";
import GameContextProvider from "../../../context/game-context";

expect.extend(toHaveNoViolations);

describe("Stats Page Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <GameContextProvider>
        <StatsPage />
      </GameContextProvider>
    );
    const link = await screen.findByTestId("statspage");
    expect(link).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
