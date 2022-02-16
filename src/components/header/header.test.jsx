/* eslint-disable-next-line import/no-unassigned-import */
import "@testing-library/jest-dom/extend-expect";
import { cleanup, findByTestId, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import Header from "./header";

expect.extend(toHaveNoViolations);

describe("Header Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("expects component without back link to have no accessibility violations", async () => {
    const { container } = render(
      <Header shouldAllowBackClick={true} url={"some-url"} />
    );
    const header = await screen.findByTestId("header");
    expect(header).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("expects header to render both logo and back link when back click is allowed", async () => {
    render(<Header shouldAllowBackClick={true} url={"/some-url"} />);
    const logo = await screen.findByTestId("header-logo");
    const backArrow = await screen.findByTestId("back-link");
    expect(logo).toBeInTheDocument();
    expect(backArrow).toBeInTheDocument;
  });

  it("expects header to render only logo when back click is not allowed", async () => {
    const { queryByTestId } = render(
      <Header shouldAllowBackClick={false} url={"/some-url"} />
    );
    const logo = await screen.findByTestId("header-logo");
    const backArrow = queryByTestId("back-link");
    expect(logo).toBeInTheDocument();
    expect(backArrow).toBeNull();
  });
});
