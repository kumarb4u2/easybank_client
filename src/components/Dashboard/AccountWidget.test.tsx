import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountWidget from "./AccountWidget";
import { Account } from "../../types/account.type";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("AccountWidget", () => {
  test("should render without error", async () => {
    render(
      <Provider store={store}>
        <AccountWidget accounts={[]} />
      </Provider>
    );
    expect(screen.getByText("Bank & Save")).toBeInTheDocument();
  });
  test("open modal to open account on click of Open another account button", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountWidget accounts={[]} />
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Open account");
    userEvent.click(button);
    expect(screen.getByText("Select an account:")).toBeInTheDocument();
  });
  test("should render accounts if present", async () => {
    const accounts: Account[] = [
      {
        accountNumber: "22656314",
        accountType: "Regular",
        balance: "123",
        transactions: [],
      },
    ];
    render(
      <Provider store={store}>
        <AccountWidget accounts={accounts} />
      </Provider>
    );
    expect(screen.getByText("22656314")).toBeInTheDocument();
  });
  test("should open modal to open account on click of Open another account button", async () => {
    const accounts: Account[] = [
      {
        accountNumber: "22656314",
        accountType: "Regular",
        balance: "123",
        transactions: [],
      },
    ];
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountWidget accounts={accounts} />
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Open another account");
    userEvent.click(button);
    expect(screen.getByText("Select an account:")).toBeInTheDocument();
  });
});
