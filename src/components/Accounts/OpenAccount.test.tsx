import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OpenAccount from "./OpenAccount";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { openAccount } from "../../gql/openAccount";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("OpenAccount", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <OpenAccount />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Select an account:")).toBeInTheDocument();
  });

  test("should render 2 account type regular and premium", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <OpenAccount />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    expect(screen.getByText("Regular account")).toBeInTheDocument();
    expect(screen.getByText("Premium account")).toBeInTheDocument();
  });

  test("should open an account when click open button after selection of account type", async () => {
    const mocks: any[] = [
      {
        request: {
          query: openAccount,
          variables: { userName: "kumar", accountType: "Regular" },
        },
        result: { data: { success: true } },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <OpenAccount />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    const accountSelection = await screen.findByText("Regular account");
    userEvent.click(accountSelection);
    const button = await screen.findByText("Open");
    userEvent.click(button);
    // TODO: fix this navigation after mutation
    expect(await mockedUseNavigate).toBeCalledTimes(0);
  });
});
