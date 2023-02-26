import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Layout } from "./";
import { Provider } from "react-redux";
import { setNotification } from "../../store/slices/notificationSlice";
import { act } from "react-dom/test-utils";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../store/rootReducer";

describe("Layout", () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  test("should render without error", async () => {
    render(
      <Provider store={store}>
        <Layout>Account</Layout>
      </Provider>
    );
    expect(screen.getByText("Account")).toBeInTheDocument();
  });
  test("should show a notifiction message if it is present", async () => {
    render(
      <Provider store={store}>
        <Layout>Account</Layout>
      </Provider>
    );
    act(() => {
      store.dispatch(
        setNotification({ message: "You are eligible.", severity: "success" })
      );
    });

    expect(screen.getByText(/You are el/)).toHaveTextContent(
      "You are eligible."
    );
  });
});
