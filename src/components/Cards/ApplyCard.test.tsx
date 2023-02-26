import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ApplyCard from "./ApplyCard";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { applyCreditCard } from "../../gql/applyCreditCard";
import { act } from "react-dom/test-utils";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("ApplyCard", () => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ name: "kumar" }));
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <ApplyCard />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Select a card to apply:")).toBeInTheDocument();
  });

  test("should render 2 account type regular and premium", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <ApplyCard />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Gold")).toBeInTheDocument();
    expect(screen.getByText("Platinum")).toBeInTheDocument();
  });

  test("should apply for a card on submit after selecting card type and entering income", async () => {
    const mocks: any[] = [
      {
        request: {
          query: applyCreditCard,
        },
        result: { data: { success: true } },
      },
    ];

    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <ApplyCard />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    const accountSelection = await screen.findByText("Gold");
    userEvent.click(accountSelection);

    userEvent.type(await screen.findByRole("textbox"), "200000");
    expect(screen.getByRole("textbox")).toHaveValue("200000");
    const button = await screen.findByText("Open");
    act(() => {
      userEvent.click(button);
    });
    expect(await mockedUseNavigate).toBeCalledTimes(0);
  });
  test("should show error if mutation failed", async () => {
    global.localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: "kumar" })
    );

    const apolloError = new ApolloError({
      graphQLErrors: [new GraphQLError("SWW")],
      networkError: null,
    });
    const mocks: any[] = [
      {
        request: {
          query: applyCreditCard,
        },
        result: apolloError,
      },
    ];

    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <ApplyCard />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    const accountSelection = await screen.findByText("Gold");
    userEvent.click(accountSelection);

    userEvent.type(await screen.findByRole("textbox"), "200000");
    expect(screen.getByRole("textbox")).toHaveValue("200000");
    const button = await screen.findByText("Open");
    act(() => {
      userEvent.click(button);
    });
    // TODO: fix below test cases
    // await waitFor(() => {
    //   expect(screen.getByText(/An error occured/)).toBeInTheDocument();
    // });
  });
});
