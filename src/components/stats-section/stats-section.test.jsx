/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import GameContextProvider from "../../context/game-context";
import StatsSection from "./stats-section";

expect.extend(toHaveNoViolations);

describe("End-of-Game Stats Section Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <GameContextProvider>
        <StatsSection />
      </GameContextProvider>
    );
    const photo = await screen.findByTestId("stats-section");
    expect(photo).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
