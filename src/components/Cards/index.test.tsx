import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cards from "./";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store";
import { getCards } from "../../gql/getCards";

describe("Accounts", () => {
  global.localStorage.setItem("currentUser", JSON.stringify({ name: "kumar" }));
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Cards />
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render the account list returned by query", async () => {
    const mocks: any[] = [
      {
        request: {
          query: getCards,
        },
        result: {
          data: {
            users: [
              {
                cards: [
                  {
                    cardNumber: "694888884221",
                    cardType: "Debit",
                    cvv: "490",
                    expiry: "12/24",
                    creditLimit: null,
                    annualCharges: "150",
                    cardCategory: null,
                    transactions: [],
                  },
                ],
              },
            ],
          },
        },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Cards />
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Cards")).toBeInTheDocument();
    expect(await screen.findByText("694888884221")).toBeInTheDocument();
  });
  test("should show error", async () => {
    const mocks: any[] = [
      {
        request: {
          query: getCards,
        },
        error: new Error("An error occurred"),
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Cards />
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument();
  });
});
