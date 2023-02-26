import { findByText, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import {
  getWelcomeModalStatus,
  updateWelcomeModal,
} from "../../gql/welcomeModalStatus";
import { getAccounts } from "../../gql/getAccounts";
import userEvent from "@testing-library/user-event";

describe("Dashboard", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("should render dashboard", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        name: "Kumar",
      })
    );
    const mocks: any[] = [
      {
        request: {
          query: getWelcomeModalStatus,
        },
        result: {
          data: {
            users: [
              {
                showWelcomeModal: false,
              },
            ],
          },
        },
      },
      {
        request: {
          query: getAccounts,
          variables: { userName: "kumar" },
        },
        result: {
          data: {
            users: [{}],
          },
        },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </Provider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("Welcome Kumar")).toBeInTheDocument();
  });
  test("should render welcome modal", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        name: "Kumar",
      })
    );
    const mocks: any[] = [
      {
        request: {
          query: getWelcomeModalStatus,
        },
        result: {
          data: {
            users: [
              {
                showWelcomeModal: true,
              },
            ],
          },
        },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </Provider>
    );

    expect(
      await screen.findByText("Welcome to EasyBank Kumar")
    ).toBeInTheDocument();
  });
  xtest("should close welcome modal on click of Ok", async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        name: "Kumar",
      })
    );
    const mocks: any[] = [
      {
        request: {
          query: getWelcomeModalStatus,
          variables: { userName: "kumar" },
        },
        result: {
          data: {
            users: [
              {
                showWelcomeModal: true,
              },
            ],
          },
        },
      },
      {
        request: {
          query: updateWelcomeModal,
          variables: { userName: "Kumar", welcomeModalSeen: false },
        },
        result: {
          data: {
            users: [
              {
                showWelcomeModal: true,
              },
            ],
          },
        },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </Provider>
    );
    const okButton = await screen.findByText("Ok");
    userEvent.click(okButton);
    await waitFor(async () => {
      expect(
        await screen.findByText("Welcome to EasyBank Kumar")
      ).not.toBeInTheDocument();
    });
  });
});
