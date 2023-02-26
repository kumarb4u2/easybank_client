import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal", () => {
  test("should render without error", async () => {
    render(<Modal open={false}>Account</Modal>);
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
  });
  test("should render with modal open", async () => {
    render(<Modal open={true}>Account</Modal>);
    expect(screen.getByText("Account")).toBeInTheDocument();
  });
});
