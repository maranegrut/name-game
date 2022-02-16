/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import Button from "./button";

expect.extend(toHaveNoViolations);

describe("Button Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component to have no accessibility violations", async () => {
    const { container } = render(
      <Button disabled={false} children={"Click me!"} />
    );
    const button = await screen.findByTestId("navigation-button");
    expect(button).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("expects button to render disabled", async () => {
    render(<Button disabled={true} children={"Click me!"} />);
    const button = await screen.findByTestId("navigation-button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
