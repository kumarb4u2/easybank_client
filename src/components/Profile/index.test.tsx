import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";

describe("Profile", () => {
  store.dispatch = jest.fn();
  test("should render component without error", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
  test("should render links if authenticated", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        name: "kumar",
        email: "kumar@gmail.com",
        mobile: "8123123213",
        address: "106 richmond st se atlanta",
      })
    );
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(screen.getByText("8123123213")).toBeInTheDocument();
  });
});
