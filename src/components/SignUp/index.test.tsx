import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "./";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockedUseNavigate = jest.fn();
const mockedUseHref = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
  useHref: () => mockedUseHref,
}));
store.dispatch = jest.fn();
describe("SignUp", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Sign up")).toBeInTheDocument();
    });
  });

  test("should show the error message in case click on Sign up button without entering information", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Sign Up");
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("User id is required.")).toBeInTheDocument();
    });
  });
});
