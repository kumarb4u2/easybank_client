import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageHeading from "./PageHeading";

describe("PageHeading", () => {
  test("should render without error", async () => {
    render(<PageHeading>Account</PageHeading>);
    expect(screen.getByRole("heading")).toHaveTextContent("Account");
  });
});
