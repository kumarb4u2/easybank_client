import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setLogOut } from "../../store/slices/authSlice";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("Header", () => {
  store.dispatch = jest.fn();
  test("should render component without error", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("EasyBank")[0]).toBeInTheDocument();
  });
  test("should render links if authenticated", () => {
    Storage.prototype.getItem = jest.fn(() => "true");
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Dashboard")[0]).toBeInTheDocument();
  });
  test("should show settings link on click of Avtar", async () => {
    Storage.prototype.getItem = jest.fn(() => "true");
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(
      await screen.getAllByRole("button")[
        screen.getAllByRole("button").length - 1
      ]
    );
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
  test("should Logout on click of logout", async () => {
    Storage.prototype.getItem = jest.fn(() => "true");
    const mockedUseNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockedUseNavigate,
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(
      await screen.getAllByRole("button")[
        screen.getAllByRole("button").length - 1
      ]
    );
    userEvent.click(screen.getByText("Logout"));
    expect(store.dispatch).toBeCalledWith(setLogOut());
  });

  test("should go to profile on click of Profile", async () => {
    Storage.prototype.getItem = jest.fn(() => "true");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(
      await screen.getAllByRole("button")[
        screen.getAllByRole("button").length - 1
      ]
    );
    userEvent.click(screen.getByText("Profile"));
    expect(mockedUseNavigate).toBeCalledWith("/profile");
  });

  test("should go to appropriate page on click of page", async () => {
    Storage.prototype.getItem = jest.fn(() => "true");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getAllByText("Dashboard")[0]);
    expect(mockedUseNavigate).toBeCalledWith("/dashboard");
  });
});
