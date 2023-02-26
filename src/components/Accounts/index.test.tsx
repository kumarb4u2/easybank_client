import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accounts from "./";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store";
import { getAccounts } from "../../gql/getAccounts";
import { MemoryRouter } from "react-router-dom";

describe("Accounts", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Accounts />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render the account list returned by query", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ name: "kumar" })
    );
    const mocks: any[] = [
      {
        request: {
          query: getAccounts,
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
            <Accounts />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Accounts")).toBeInTheDocument();
    expect(await screen.findByText("Transactions")).toBeInTheDocument();
  });
  test("should show error", async () => {
    const mocks: any[] = [
      {
        request: {
          query: getAccounts,
        },
        error: new Error("An error occurred"),
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Accounts />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument();
  });
});
