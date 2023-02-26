import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadioCard from "./RadioCard";
import { RadioCardItem } from "../../types/RadioCardItem";
import userEvent from "@testing-library/user-event";

describe("RadioCard", () => {
  test("should render card content", async () => {
    const item: RadioCardItem = {
      name: "Regular account",
      description: "Minimum balance is 0",
      selected: false,
      type: "Regular",
    };
    const handleRadioSelect = jest.fn();
    render(<RadioCard item={item} handleRadioSelect={handleRadioSelect} />);
    expect(screen.queryByText(/Regular/)).toHaveTextContent("Regular account");
  });
  test("should call handleRadioSelect on click of tile", async () => {
    const item: RadioCardItem = {
      name: "Regular account",
      description: "Minimum balance is 0",
      selected: false,
      type: "Regular",
    };
    const handleRadioSelect = jest.fn();
    render(<RadioCard item={item} handleRadioSelect={handleRadioSelect} />);
    await userEvent.click(screen.getByText("Regular account"));
    expect(handleRadioSelect).toBeCalledWith(item);
  });
});
