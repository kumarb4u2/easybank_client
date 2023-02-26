import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Collapsible from "./Collapsible";

describe("Collapsible", () => {
  const data = {
    name: "EasyBank Regular Account",
    features: [
      "No minimum balance",
      "You could get 1% cashback on eligible utility bills. T&Cs apply.",
      "INR 0 international transaction fees when you shop online and overseas.",
      "Save on fees with up to 5 rebated ATM withdrawal fees a month in India and overseas.",
    ],
    additionalInfo:
      "Available when customers deposit INR 1,000+ from an external source to any personal account in their name (excludLivSuper, Personal Loans and make 5 or more settled (not pending) eligible card purchases each month. When the criteria is met in a calendar month, the benefits will apply in the next calendar month.",
  };

  test("initial state should be collapsed", async () => {
    render(<Collapsible data={data} />);
    expect(screen.queryByText("No minimum balance")).toBeNull();
  });

  test("content should be expanded after button click", async () => {
    render(<Collapsible data={data} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("No minimum balance")).toBeInTheDocument();
  });
});
