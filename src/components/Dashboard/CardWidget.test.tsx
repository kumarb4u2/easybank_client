import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardWidget from "./CardWidget";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { Card } from "../../types/card.type";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("CardWidget", () => {
  test("should render without error", async () => {
    render(
      <Provider store={store}>
        <CardWidget cards={[]} />
      </Provider>
    );
    expect(screen.getByText("Credit cards")).toBeInTheDocument();
  });
  test("open modal to open account on click of Open another account button", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CardWidget cards={[]} />
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Apply for credit card");
    userEvent.click(button);
    expect(screen.getByText("Select a card to apply:")).toBeInTheDocument();
  });
  test("should render accounts if present", async () => {
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
    render(
      <Provider store={store}>
        <CardWidget cards={cards} />
      </Provider>
    );
    expect(screen.getByText("694888884221")).toBeInTheDocument();
  });
  test("should open modal to open account on click of Open another account button", async () => {
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
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CardWidget cards={cards} />
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Apply for another card");
    userEvent.click(button);
    expect(screen.getByText("Select a card to apply:")).toBeInTheDocument();
  });
});
