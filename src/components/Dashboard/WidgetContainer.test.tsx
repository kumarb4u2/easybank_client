import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WidgetContainer from "./WidgetContainer";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store";
import { getCardsAndAccounts } from "../../gql/getCardsAndAccounts";
import { MemoryRouter } from "react-router-dom";

describe("WidgetContainer", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <WidgetContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render the account list returned by query", async () => {
    const mocks: any[] = [
      {
        request: {
          query: getCardsAndAccounts,
        },
        result: {
          data: {
            users: [
              {
                accounts: [
                  {
                    accountNumber: "22656314",
                    accountType: "Regular",
                    balance: 123,
                    transactions: [
                      {
                        id: "1078943",
                        description:
                          "withdrawal transaction at Rempel, Emmerich and Jast using card ending with ***(...2377) for CRC 111.54 in account ***05843770",
                        transactionType: "deposit",
                        date: "1674595165246",
                        amount: "389.26",
                      },
                      {
                        id: "1077370",
                        description:
                          "invoice transaction at Stoltenberg, Wintheiser and Stoltenberg using card ending with ***(...0615) for JMD 714.07 in account ***95827624",
                        transactionType: "invoice",
                        date: "1650097634500",
                        amount: "558.52",
                      },
                    ],
                  },
                ],
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
          <MemoryRouter>
            <WidgetContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Account details")).toBeInTheDocument();
    expect(await screen.findByText("Card details")).toBeInTheDocument();
  });
  test("should show error", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        name: "kumar",
        email: "kumar@gmail.com",
        mobile: "8123123213",
        address: "106 richmond st se atlanta",
      })
    );
    const mocks: any[] = [
      {
        request: {
          query: getCardsAndAccounts,
        },
        error: new Error("An error occurred"),
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <WidgetContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument();
  });
});
