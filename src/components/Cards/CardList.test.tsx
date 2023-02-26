import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardList } from "./CardList";
import { Card } from "../../types/card.type";

describe("CardList", () => {
  test("should render without errors", async () => {
    const cards: Card[] = [
      {
        cardNumber: "694888884221",
        cardType: "Debit",
        cvv: "490",
        expiry: "12/24",
        annualCharges: "150",
        transactions: [],
      },
    ];
    render(<CardList cards={cards} />);
    expect(screen.getByText("694888884221")).toBeInTheDocument();
  });
});
